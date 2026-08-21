import './styles/base.css';
import './styles/console.css';
import './styles/sections.css';

import { Hero } from './components/Hero';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { ConfigSection } from './components/sections/ConfigSection';
import { ConsoleSection } from './components/sections/ConsoleSection';
import { FxSection } from './components/sections/FxSection';
import { InstallSection } from './components/sections/InstallSection';
import { LimitsSection } from './components/sections/LimitsSection';
import { MapperSection } from './components/sections/MapperSection';
import { RoutingSection } from './components/sections/RoutingSection';

export function App() {
  return (
    <>
      <a className="skip-link" href="#console">
        Skip to the console
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <ConsoleSection />
        <RoutingSection />
        <FxSection />
        <MapperSection />
        <ConfigSection />
        <InstallSection />
        <LimitsSection />
      </main>
      <SiteFooter />
    </>
  );
}
