import * as _apm from 'elastic-apm-node';

if (!_apm.isStarted()) {
  _apm.start({
    serviceName: process.env.ELASTIC_APM_SERVICE_NAME,
    serverUrl: process.env.ELASTIC_APM_SERVER_URL,
    secretToken: process.env.ELASTIC_APM_SECRET_TOKEN,
    apiKey: process.env.ELASTIC_APM_API_KEY,
    environment: process.env.ELASTIC_APM_ENVIRONMENT,
  });
}

export const apm = _apm;
