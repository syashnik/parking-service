import { createLogger, format, transports } from 'winston';
import appConfig from '../config/appConfig';

const { combine, timestamp, printf, colorize, errors } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logger = createLogger({
  level: appConfig.getLogLevel(),
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), colorize(), logFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

export default logger;
