import { NAV, SITE } from '../data/site';

export function SiteHeader() {
  return (
    <header className="site-head">
      <div className="wrap site-head__inner">
        <a className="site-head__brand" href="#top">
          <span className="site-head__mark" aria-hidden="true">
            V
          </span>
          VIRTMIX
        </a>
        <span className="site-head__version">v{SITE.version}</span>

        <nav className="site-head__nav" aria-label="Sections">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="btn btn--primary site-head__cta" href={SITE.repo} rel="noreferrer noopener">
          GITHUB →
        </a>
      </div>
    </header>
  );
}
