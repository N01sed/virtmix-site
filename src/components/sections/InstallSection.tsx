import { DISTROS, PREREQS } from '../../data/content';
import { SITE } from '../../data/site';
import { CopyButton } from '../CopyButton';
import { Reveal } from '../Reveal';

const COMMANDS = [
  `git clone ${SITE.repo}.git`,
  'cd virtmix',
  './assets/install.sh',
] as const;

const ONE_LINER = COMMANDS.join(' && ');

export function InstallSection() {
  return (
    <section className="section" id="install" aria-labelledby="install-title">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow eyebrow--green">INSTALL</p>
          <h2 className="section-title" id="install-title">
            Avaliable from APT
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

            <div className="actions">
              <a
                className="btn btn--primary btn--lg"
                href={`${SITE.repo}/releases/latest`}
                rel="noreferrer noopener"
              >
                DOWNLOAD LTS ↓
              </a>
              <CopyButton
                className="btn btn--lg"
                text={ONE_LINER}
                label="INSTALL WITH SCRIPT"
                copiedLabel="● COPIED — PASTE IN A TERMINAL"
              />
            </div>

            <p className="actions__note">
              The package page carries every format. The script clones the repository and runs the
              installer — the three lines above, on one line.
            </p>
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
