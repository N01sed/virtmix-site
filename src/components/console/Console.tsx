import { LEGEND, STRIPS } from '../../data/console';
import { SITE } from '../../data/site';
import { useInView } from '../../hooks/useInView';
import { Strip } from './Strip';

const LEGEND_COLOR: Record<string, string> = {
  green: 'var(--sig-green)',
  cyan: 'var(--sig-cyan)',
  amber: 'var(--sig-amber)',
  red: 'var(--sig-red)',
};

export function Console() {
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: '120px 0px' });

  const sources = STRIPS.filter((s) => s.group === 'sources');
  const rack = STRIPS.filter((s) => s.group === 'rack');

  return (
    <div className="console" ref={ref} aria-hidden="true">
      <div className="console__bar">
        <span className="console__logo">VIRTMIX</span>
        <span className="console__engine">{SITE.engine}</span>
        <span className="console__spacer" />
        <span className="console__state">
          <i className="led led--amber" />
          UNSAVED
        </span>
        <span className="btn btn--primary">SAVE CONFIG</span>
        <span className="btn btn--glyph">⚙</span>
        <span className="btn btn--glyph">⟳</span>
      </div>

      <div className="console__scroll">
        <div className="console__rack">
          <div className="console__banners">
            <span className="console__banner" style={{ width: 293 }}>
              SOURCES
            </span>
            <span className="console__gap" />
            <span className="console__banner console__banner--wide">
              BUSES · OUTPUTS · VIRTUAL MICS
            </span>
          </div>

          <div className="console__strips">
            {sources.map((strip, i) => (
              <Strip key={strip.id} strip={strip} index={i} active={inView} />
            ))}
            <span className="console__gap" />
            {rack.map((strip, i) => (
              <Strip key={strip.id} strip={strip} index={i + sources.length} active={inView} />
            ))}
          </div>
        </div>
      </div>

      <div className="console__legend">
        {LEGEND.map((item) => (
          <span key={item.label} className="console__legend-item">
            <i className="chip" style={{ background: LEGEND_COLOR[item.tone] }} />
            {item.label}
          </span>
        ))}
        <span className="console__spacer" />
        <span className="console__version">v{SITE.version}</span>
      </div>
    </div>
  );
}
