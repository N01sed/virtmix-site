import { DISTROS, PREREQS } from '../../data/content';
import { SITE } from '../../data/site';
import { Reveal } from '../Reveal';

const COMMANDS = [
  `git clone ${SITE.repo}.git`,
  'cd virtmix',
  './assets/install.sh',
] as const;

export function InstallSection() {
  return (
    <section className="section" id="install" aria-labelledby="install-title">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow eyebrow--green">06 · INSTALL</p>
          <h2 className="section-title" id="install-title">
            One script, no root
          </h2>
          <p className="section-lede">
            The installer checks what is missing, prints the apt or dnf line for your distribution,
            compiles the Rust binary and drops it in ~/.local. What is not satisfied is said out
            loud at start-up — a banner, greyed-out commands, never a silent failure.
          </p>
        </Reveal>

        <div className="split split--install">
          <Reveal className="split__visual">
            <figure className="code code--term">
              <figcaption className="code__cap">shell</figcaption>
              <pre className="code__body">
                {COMMANDS.map((line) => (
                  <code key={line} className="code__line">
                    <span className="code__prompt">$</span> {line}
                  </code>
                ))}
              </pre>
            </figure>

            <div className="flagrow">
              <span className="flag">
                <b>--uninstall</b> removes the binary, keeps your settings
              </span>
              <span className="flag">
                <b>--purge</b> clears everything, settings included
              </span>
            </div>
          </Reveal>

          <Reveal className="split__text" step={1}>
            <h3 className="minor">PREREQUISITES</h3>
            <ul className="ticks">
              {PREREQS.map((item) => (
                <li key={item}>
                  <i className="chip chip--green" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="minor">DISTRIBUTIONS</h3>
            <table className="table">
              <tbody>
                {DISTROS.map((distro) => (
                  <tr key={distro.name}>
                    <th scope="row">{distro.name}</th>
                    <td>{distro.command}</td>
                    <td className={distro.state === 'covered' ? 'is-covered' : 'is-manual'}>
                      {distro.state === 'covered' ? 'AUTOMATED' : 'LISTED'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
