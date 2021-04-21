import expressWinston from 'express-winston'
import winston from 'winston'
import { get } from 'lodash'

const { combine, timestamp, label, printf } = winston.format

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] [level=${level}] ${message}`
})

export const apiLogger = winston.createLogger({
  format: combine(
    label({ label: 'API' }),
    timestamp(),
    myFormat
  ),
  transports: [
    new winston.transports.Console()
  ]
})

export const loggerMiddleware = expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: combine(
    label({ label: 'API' }),
    timestamp(),
    myFormat
  ),
  meta: true,
  msg: (req) => `[user_id=${get(req, ['user', 'id'], '')}] {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms`,
  dynamicMeta: (req) => ({ user_id: get(req, ['user', 'id'], '') }),
  colorize: false
})
