import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';

/**
 * Called at build time by scripts/prerender.mjs. renderToString, not
 * renderToStaticMarkup: hydration needs the text-node markers it emits.
 */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
