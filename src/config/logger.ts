import winston from 'winston'

// Base logger
const logger = winston.createLogger({
  level: 'info',

  format: winston.format.combine(winston.format.prettyPrint(), winston.format.json())
})

// Log to the console
logger.add(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.prettyPrint(),
      winston.format.json(),
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(
        ({ timestamp, level, message }) => `[${timestamp}] ${level} - ${JSON.stringify(message || '""', undefined, 2)}`
      )
    ),

    level: 'debug'
  })
)

export default logger
