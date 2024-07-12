import * as winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: {
    service: 'fr-member-management',
    '@timestamp': new Date().toISOString(),
  },
  transports: [
    new winston.transports.Console({ format: winston.format.json() }),
  ],
});
