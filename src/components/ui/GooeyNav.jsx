import { useRef, useEffect, useLayoutEffect, useState } from "react";
import "./GooeyNav.css";

const GooeyNav = ({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
  className = "",
}) => {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const filterRef = useRef(null);
  const textRef = useRef(null);
  // -1 = no item active (e.g. still on the hero, which has no nav entry)
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  // While a clicked link is smooth-scrolling to its section the scroll spy is
  // held: otherwise the pill hops through every section the page passes.
  const spyLock = useRef({ locked: false, raf: 0, hold: null, release: null });

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance, pointIndex, totalPoints) => {
    const angle =
      (((360 + noise(8)) / totalPoints) * pointIndex * Math.PI) / 180;
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i, t, d, r) => {
    const rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };

  const makeParticles = (element) => {
    const d = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty("--time", `${bubbleTime}ms`);

    // Restart the pill animation in this frame (reflow between remove/add)
    // rather than after a timer — the pill used to blank out for ~50ms.
    element.classList.remove("active");
    void element.offsetWidth;

    const batch = document.createDocumentFragment();
    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      const particle = document.createElement("span");
      const point = document.createElement("span");
      particle.classList.add("particle");
      particle.style.setProperty("--start-x", `${p.start[0]}px`);
      particle.style.setProperty("--start-y", `${p.start[1]}px`);
      particle.style.setProperty("--end-x", `${p.end[0]}px`);
      particle.style.setProperty("--end-y", `${p.end[1]}px`);
      particle.style.setProperty("--time", `${p.time}ms`);
      particle.style.setProperty("--scale", `${p.scale}`);
      particle.style.setProperty("--color", `var(--color-${p.color}, white)`);
      particle.style.setProperty("--rotate", `${p.rotate}deg`);

      point.classList.add("point");
      particle.appendChild(point);
      batch.appendChild(particle);
      setTimeout(() => {
        if (particle.parentNode === element) {
          element.removeChild(particle);
        }
      }, t);
    }
    element.appendChild(batch);
    element.classList.add("active");
  };

  const updateEffectPosition = (element) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();

    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  };

  const handleItemActivate = (liEl, index) => {
    if (activeIndex === index) return;

    // Move the pill before restarting its animations, so they don't start on
    // the previously selected item and jump over a frame later.
    updateEffectPosition(liEl);

    if (filterRef.current) {
      const particles = filterRef.current.querySelectorAll(".particle");
      particles.forEach((p) => filterRef.current.removeChild(p));
    }

    if (textRef.current) {
      textRef.current.classList.remove("active");
      void textRef.current.offsetWidth;
      textRef.current.classList.add("active");
    }

    if (filterRef.current) {
      makeParticles(filterRef.current);
    }

    setActiveIndex(index);
  };

  const handleClick = (e, index) => {
    // Links that open in a new tab (e.g. Résumé) don't change the active section
    if (items[index]?.target === "_blank") return;
    const liEl = e.currentTarget.closest("li");
    if (liEl) {
      handleItemActivate(liEl, index);
    }

    spyLock.current.hold?.();
  };

  // Scroll spy — without this the pill stays wherever it was last clicked (or on
  // the initial item) no matter which section you've actually scrolled to.
  useEffect(() => {
    const targets = items
      .map((item, index) => {
        if (!item.href?.startsWith("#") || item.href === "#") return null;
        const anchor = document.getElementById(item.href.slice(1));
        if (!anchor) return null;
        return { el: anchor.closest("section") ?? anchor, index };
      })
      .filter(Boolean);

    if (!targets.length) return;

    const lock = spyLock.current;
    const visible = new Map();
    const lastIndex = targets[targets.length - 1].index;
    const apply = () => {
      if (lock.locked) return;
      const doc = document.documentElement;
      let next;
      if (
        window.scrollY > 0 &&
        window.innerHeight + window.scrollY >= doc.scrollHeight - 2
      ) {
        // At the very bottom the last section wins: on a tall window it can't
        // scroll up to the navbar, so the one above it is still "topmost".
        next = lastIndex;
      } else if (visible.size) {
        // topmost section currently on screen wins
        next = Math.min(...visible.keys());
      } else if (targets[0].el.getBoundingClientRect().top > 0) {
        // above the first section (the hero) — nothing is active
        next = -1;
      } else {
        return;
      }
      setActiveIndex((current) => (current === next ? current : next));
    };
    lock.release = () => {
      cancelAnimationFrame(lock.raf);
      if (!lock.locked) return;
      lock.locked = false;
      apply();
    };
    // Hold the spy until the page has actually stopped moving. This is judged
    // by sampling scrollY per frame, not by timers or scroll events: a busy
    // main thread (3D scenes mounting mid-scroll) delays scroll events past
    // any timeout, which used to release the lock early and snap the pill
    // back to the old section before hopping through every one on the way.
    lock.hold = () => {
      lock.locked = true;
      cancelAnimationFrame(lock.raf);
      let lastY = window.scrollY;
      let lastT = performance.now();
      let stillSince = lastT;
      let stillFrames = 0;
      let smoothStillFrames = 0;
      const tick = (now) => {
        const y = window.scrollY;
        const gap = now - lastT;
        lastT = now;
        if (y !== lastY) {
          lastY = y;
          stillSince = now;
          stillFrames = 0;
          smoothStillFrames = 0;
        } else {
          stillFrames += 1;
          // a frame that follows a stall says nothing about the scroll
          if (gap <= 100) smoothStillFrames += 1;
        }
        const idle = now - stillSince;
        if (
          (smoothStillFrames >= 5 && idle >= 150) ||
          (stillFrames >= 3 && idle >= 1000)
        ) {
          lock.release?.();
        } else {
          lock.raf = requestAnimationFrame(tick);
        }
      };
      lock.raf = requestAnimationFrame(tick);
    };
    // Unlocked, this catches reaching the bottom of the page (no intersection
    // changes there, so the observer alone would miss it).
    const onScroll = () => apply();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const match = targets.find((t) => t.el === entry.target);
          if (!match) return;
          if (entry.isIntersecting) visible.set(match.index, entry.intersectionRatio);
          else visible.delete(match.index);
        });
        apply();
      },
      // offset by the fixed navbar so a section counts as active once it clears it
      { rootMargin: "-80px 0px -55% 0px", threshold: [0, 0.25, 0.5] }
    );

    targets.forEach((t) => observer.observe(t.el));
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(lock.raf);
      lock.locked = false;
      lock.hold = null;
      lock.release = null;
    };
  }, [items]);

  // Layout effect: the pill moves in the same frame as the `active` class
  useLayoutEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const activeLi = navRef.current.querySelectorAll("li")[activeIndex];
    if (activeLi) {
      updateEffectPosition(activeLi);
      textRef.current?.classList.add("active");
    } else if (textRef.current && filterRef.current) {
      // No active item: collapse the pill instead of leaving it on the last one
      textRef.current.classList.remove("active");
      textRef.current.innerText = "";
      const collapsed = { width: "0px", height: "0px" };
      Object.assign(filterRef.current.style, collapsed);
      Object.assign(textRef.current.style, collapsed);
    }

    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll("li")[activeIndex];
      if (currentActiveLi) {
        updateEffectPosition(currentActiveLi);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  return (
    <div className={`gooey-nav-container ${className}`} ref={containerRef}>
      <nav>
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li key={`${item.label}-${index}`} className={activeIndex === index ? "active" : ""}>
              <a
                href={item.href}
                onClick={(e) => handleClick(e, index)}
                target={item.target}
                rel={item.rel}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <span className="effect filter" ref={filterRef} />
      <span className="effect text" ref={textRef} />
    </div>
  );
};

export default GooeyNav;
