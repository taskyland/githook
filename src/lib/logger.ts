/**
 * Logger object
 */
class Logger {
  /** @type {string} Discord webhook URL */
  private webhook: string;

  /** @type {string} Name of the application */
  private name?: string;

  /** @type {string | null} Application icon URL string */
  private icon?: string | null;

  /**
   * Construct the Logger class
   * @typedef {Object} LoggerOptions
   * @param {string} options.webhook The Discord webhook URL
   */
  constructor(options: LoggerOptions) {
    this.webhook = options.webhook;
    this.name = "Githook";
    this.icon =
      "https://cdn.discordapp.com/avatars/963376966763937802/5ff0149d9a8d4376654a1cff4cf9763a.png";

    // Test if webhook and icon links are valid urls
    if (this.webhook) {
      try {
        new URL(this.webhook);
      } catch (err) {
        throw new Error("Webhook is not a valid url");
      }
    }
  }

  /**
   * Send a POST request to webhook using specified options
   * @param {RequestOptions} options Request options
   */
  private async sendReq(options: RequestOptions): Promise<void> {
    fetch(this.webhook, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.name,
        avatar_url: this.icon,
        embeds: [
          {
            color: options.color,
            title: options.type,
            description: await this.descriptionBuilder(options),
          },
        ],
      }),
    });
  }

  /**
   * Build the log description: include message, json, and error stack
   * @param options Request options
   * @returns Description string
   */
  private async descriptionBuilder(options: RequestOptions): Promise<string> {
    return `
            ${`\`\`\`ansi\n${options.message}\`\`\``}
            `;
  }

  /**
   * @typedef {Object} RequestOptions
   * @param {string} message Message to pass to log
   * @param {string} [type] Log level (Error, warn, debug, info)
   * @param {number} [color] Color defined by log level
   * @param {string} [title] Optional title to include in log
   * @param {Error} [error] Optional error object to include in log
   */

  /** @type {RequestOptions} options - Request options */
  async error(options: RequestOptions): Promise<void> {
    options.type = "ERROR";
    options.color = 15158332;
    await this.sendReq(options);
  }

  /** @type {RequestOptions} options - Request options */
  async warn(options: RequestOptions): Promise<void> {
    options.type = "WARNING";
    options.color = 16159744;
    await this.sendReq(options);
  }

  /** @type {RequestOptions} options - Request options */
  async debug(options: RequestOptions): Promise<void> {
    options.type = "DEBUG";
    options.color = 40000;
    await this.sendReq(options);
  }

  /** @type {RequestOptions} options - Request options */
  async info(options: RequestOptions): Promise<void> {
    options.type = "INFO";
    options.color = 3447003;
    await this.sendReq(options);
  }

  /** @type {RequestOptions} options - Request options */
  async custom(options: RequestOptions): Promise<void> {
    options.type ? options.type : (options.type = "CUSTOM");
    options.color ? options.color : (options.color = 12895428);
    await this.sendReq(options);
  }
}
export default {
  /**
   * @type {Logger} Default logger object
   */
  Logger,
};

export {
  /**
   * @type {Logger} Explicit logger object
   */
  Logger,
};

export interface LoggerOptions {
  /**
   * Discord webhook URL
   * ```js
   * webhook: "https://discord.com/api/webhooks/id/token"
   * ```
   * See [Discord webhooks documentation](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) for more information.
   */
  webhook: string;
}

export interface RequestOptions {
  /**
   * Message to pass to log
   * ```js
   * message: "This is an error message"
   * ```
   */
  message: string;
  /**
   * Type of log (ERROR, WARN, DEBUG, INFO, CUSTOM).  The type field will be ignored unless logger.custom(...) is used.
   * ```js
   * type: "CUSTOM TYPE"
   * ```
   */
  type?: string;
  /**
   * Uses decimal format.  Color can only be defined when logger.custom(...) is used
   * ```js
   * color: 15252531
   * ```
   */
  color?: number;
  /**
   * Optional title to include in log
   * ```js
   * title: "An error has occured!"
   * ```
   */
  json?: Record<string, unknown> | undefined;
  /**
   * Optional error stack to display in log
   * ```js
   * error: Error("Error message") // Custom error is valid
   *
   * error: err // Error callback is valid
   * ```
   */
  error?: Error;
}
