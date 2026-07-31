// Shared project link list for the tech info cards (solar system + mobile sheet).
//
// Some entries in `technologies` point at in-page anchors ("#projects", "#")
// rather than external URLs. Those must NOT get target="_blank" — that opens a
// blank tab or a duplicate copy of the site instead of scrolling. In-page links
// close the card first so the overlay doesn't sit on top of the destination.
const isInPage = (link) => typeof link === 'string' && link.startsWith('#');

const TechProjectLinks = ({ projects, color, onNavigate }) => {
  if (!projects?.length) return null;

  return (
    <div className="flex flex-col gap-2">
      {projects.map((p) => {
        const inPage = isInPage(p.link);
        return (
          <a
            key={p.name}
            href={p.link}
            {...(inPage ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
            onClick={inPage ? onNavigate : undefined}
            className="flex items-center gap-2 group"
          >
            <span className="text-sm" style={{ color }}>→</span>
            <span className="text-sm text-white/70 group-hover:text-white transition-colors">
              {p.name}
            </span>
          </a>
        );
      })}
    </div>
  );
};

export default TechProjectLinks;
