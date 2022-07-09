import winston, { format } from "winston";

const { colorize, combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `|${timestamp}| ${level}: ${message}`;
});

const transports: winston.transport[] = [new winston.transports.Console()];

// if (process.env.NODE_ENV === 'production') {
//   transports.push(
//     new winston.transports.File({
//       filename: '/logs/admin-portal.log',
//       level: 'info',
//     })
//   );
// }

export const logger = winston.createLogger({
  level: "info",
  format: combine(colorize(), timestamp(), logFormat),
  transports,
});
