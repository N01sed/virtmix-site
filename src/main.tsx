import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';

const root = document.getElementById('root');

// Reveal-on-scroll only exists once the client is alive: the stylesheet keeps
// everything visible until this class lands.
document.documentElement.classList.add('js-reveal');

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (root) {
  // The production build ships prerendered markup; the dev server does not.
  if (root.firstElementChild) {
    hydrateRoot(root, app);
  } else {
    createRoot(root).render(app);
  }
}
