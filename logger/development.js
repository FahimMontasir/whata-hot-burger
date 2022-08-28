const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

const developmentLogger = () => {
  const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
  });

  return createLogger({
    level: "debug",
    format: combine(
      format.colorize(),
      label({ label: "right meow!" }),
      timestamp({ format: "HH:mm:ss" }),
      myFormat
    ),

    transports: [
      new transports.Console(),
      new transports.File({
        filename: "errors.log",
        handleExceptions: true,
        level: "error",
      }),
    ],
    exceptionHandlers: [new transports.Console()],

    exitOnError: false,
  });
};

module.exports = developmentLogger;
