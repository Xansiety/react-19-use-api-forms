type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  meta?: Record<string, unknown>;
}

// Orden de severidad: solo se registran entradas >= al nivel configurado
const LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const LEVEL_STYLES: Record<LogLevel, string> = {
  debug: "color: gray",
  info: "color: dodgerblue",
  warn: "color: orange",
  error: "color: crimson; font-weight: bold",
};

class Logger {
  // Emula el buffer interno de un servicio de logging real
  private history: LogEntry[] = [];

  constructor(private minLevel: LogLevel = "debug") {}

  debug(message: string, meta?: Record<string, unknown>) {
    this.log("debug", message, meta);
  }

  info(message: string, meta?: Record<string, unknown>) {
    this.log("info", message, meta);
  }

  warn(message: string, meta?: Record<string, unknown>) {
    this.log("warn", message, meta);
  }

  error(message: string, meta?: Record<string, unknown>) {
    this.log("error", message, meta);
  }

  getHistory(): readonly LogEntry[] {
    return this.history;
  }

  private log(level: LogLevel, message: string, meta?: Record<string, unknown>) {
    if (LEVELS[level] < LEVELS[this.minLevel]) return;

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...(meta && { meta }),
    };

    this.history.push(entry);

    // "Transporte" de consola, con formato tipo winston
    console.log(
      `%c[${entry.timestamp}] ${level.toUpperCase()}: ${message}`,
      LEVEL_STYLES[level]
    );
    if (meta) console.log(meta);

    // Aquí un logger real enviaría la entrada a un servicio externo
    // (Sentry, Datadog, un endpoint propio...). Lo emulamos:
    this.sendToService(entry);
  }

  private sendToService(entry: LogEntry) {
    if (entry.level !== "error") return;
    console.log(
      "%c📡 (emulado) Enviando error al servicio de logging...",
      "color: mediumpurple"
    );
  }
}

export const logger = new Logger();

export function logErrorToMyService(
  error: Error,
  componentStack: string | null,
  ownerStack: string | null
): void {
  logger.error(error.message, {
    stack: error.stack,
    componentStack,
    ownerStack,
  });
}
