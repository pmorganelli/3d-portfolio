import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks } from '../constants';
import { hero, menu, close } from '../assets';
import { Github } from './FeatherIcons/githubIcon';
import { Linkedin } from './FeatherIcons/linkedIn';
import GooeyNav from './ui/GooeyNav';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const desktopNavItems = navLinks.map((nav) => {
    const isResume = nav.title === 'Résumé';
    return {
      label: nav.title,
      href: isResume ? '/resume.pdf' : `#${nav.id}`,
      ...(isResume ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
    };
  });

  return (
    
    <nav
      className='w-full flex items-center py-4 sm:py-5 fixed top-0 z-20 bg-primary px-4 sm:px-16'
    >
      {/* <img src={hero} alt='hero'/> */}
      <div className="w-full text-secondary flex justify-between items-center max-w-7xl mx-auto">
        <Link 
          to="/" 
          className="flex items-center gap-2 min-w-0"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0)
          }}
        >
          <img src={hero} alt='heroImage' className="w-9 h-9 object-contain" />
          <p className="text-secondary hover:text-white text-[16px] sm:text-[18px] font-bold cursor-pointer transition-colors whitespace-nowrap">
            <span className='sm:hidden'>Peter M.</span>
            <span className='hidden sm:inline'>Peter Morganelli</span>
          </p>
        </Link>

        <div className='hidden sm:flex items-center gap-6'>
          <GooeyNav
            items={desktopNavItems}
            particleCount={10}
            particleDistances={[48, 8]}
            particleR={48}
            initialActiveIndex={0}
            animationTime={390}
            timeVariance={150}
            colors={[2, 3, 4, 3, 2]}
          />
          <div className='flex items-center gap-4 text-secondary'>
            <h1>
              <a href='https://github.com/pmorganelli' aria-label='GitHub' className='hover:text-white transition-colors'>
                <Github />
              </a>
            </h1>
            <h1>
              <a href='https://www.linkedin.com/in/peter-morganelli-102860258/' aria-label='LinkedIn' className='hover:text-white transition-colors'>
                <Linkedin />
              </a>
            </h1>
          </div>
        </div>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img src={toggle ? close : menu} alt="menu" className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)} 
          />
          <div className={`${!toggle ? 'hidden' : 'flex'} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
              <ul className='list-none flex justify-end items-start flex-col gap-4'>
              {navLinks.map((nav) => (
                <li key={nav.id} className="text-secondary hover:text-white font-poppins font-medium cursor-pointer text-[16px] transition-colors"
                  onClick={() => {
                    setActive(nav.title);
                    setToggle(!toggle);
                  }}
                >
                  <a
                    href={nav.title === "Résumé" ? `/resume.pdf` : `#${nav.id}`}
                    target={nav.title === "Résumé" ? "_blank" : undefined}
                    rel={nav.title === "Résumé" ? "noopener noreferrer" : undefined}
                  >
                    {nav.title}
                  </a>
                </li>
              ))}
              <h1 className="ps-8 justify-self-center">
                <a href="https://github.com/pmorganelli"><Github /></a>
              </h1>
              <h1 className="ps-8 justify-self-center">
                <a href="https://www.linkedin.com/in/peter-morganelli-102860258/"><Linkedin /></a>
              </h1>
              {/* <h1 className="ps-8 justify-self-center">
                <a href="https://www.instagram.com/petermorganelli"><Instagram /></a>
              </h1> */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
