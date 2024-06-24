/* eslint-disable no-console */
import { env } from '../config';

export const getLogger = (prefix: string) => ({
  info: (...msgs: unknown[]) => console.info(`${prefix}|${msgs}`),
  error: (...msgs: unknown[]) => console.error(`${prefix}|${msgs}`),
  debug: (...msgs: unknown[]) => (env.DEBUG ? console.debug(`${prefix}|${msgs}`) : undefined),
  warn: (...msgs: unknown[]) => console.warn(`${prefix}|${msgs}`),
});
