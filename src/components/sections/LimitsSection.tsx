import { LIMITS } from '../../data/content';
import { Reveal } from '../Reveal';

export function LimitsSection() {
  return (
    <section className="section" id="limits" aria-labelledby="limits-title">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow eyebrow--amber">07 · LIMITS</p>
          <h2 className="section-title" id="limits-title">
            What it does not do
          </h2>
          <p className="section-lede">
            Known and assumed. Each of these is a trade, not an oversight — and the reason is worth
            more than the promise.
          </p>
        </Reveal>

        <div className="grid grid--2 grid--flush">
          {LIMITS.map((limit, i) => (
            <Reveal key={limit.title} className="cell cell--limit" step={i % 2}>
              <h3 className="cell__title cell__title--amber">{limit.title}</h3>
              <p className="cell__body">{limit.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
