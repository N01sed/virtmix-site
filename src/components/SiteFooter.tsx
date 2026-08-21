import { SITE } from '../data/site';

export function SiteFooter() {
  return (
    <footer className="site-foot">
      <div className="wrap site-foot__inner">
        <span className="site-foot__brand">VIRTMIX</span>
        <span className="site-foot__meta">
          v{SITE.version} · {SITE.license} · Rust + PipeWire
        </span>
        <span className="console__spacer" />
        <a href={SITE.repo} rel="noreferrer noopener">
          GITHUB
        </a>
        <a href={`${SITE.repo}/issues`} rel="noreferrer noopener">
          ISSUES
        </a>
        <a href={`${SITE.repo}/blob/main/LICENSE`} rel="noreferrer noopener">
          LICENCE
        </a>
      </div>
    </footer>
  );
}
