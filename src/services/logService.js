import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

function init() {
  Sentry.init({
  dsn: "https://81a5163c631148529c24f2d9fc3fc923@o1065464.ingest.sentry.io/6057183",
  integrations: [new Integrations.BrowserTracing()],

  tracesSampleRate: 1.0,
});
}

function log(error) {
  console.error(error);
}

export default { init, log };