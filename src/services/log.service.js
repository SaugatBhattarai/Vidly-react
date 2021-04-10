import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";


function init() {
  Sentry.init({
    dsn: "https://3a5aadaab9624d469a5283868c670547@o567763.ingest.sentry.io/5712044",
    integrations: [new Integrations.BrowserTracing()],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

function log(err) {
  Sentry.captureException(err)
}

export default {
  init,
  log
};
