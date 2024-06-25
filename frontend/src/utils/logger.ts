/* eslint-disable no-console */

export const getLogger = (prefix: string) => ({
  info: (...msgs: unknown[]) => console.info(`${prefix}|${msgs}`),
  error: (...msgs: unknown[]) => console.error(`${prefix}|${msgs}`),
  warn: (...msgs: unknown[]) => console.warn(`${prefix}|${msgs}`),
});
