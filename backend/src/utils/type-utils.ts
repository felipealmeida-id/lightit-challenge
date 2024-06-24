/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */

export function invertEnum<T extends Record<string, string | number>>(
  enumObj: T,
): { [K in T[keyof T]]: keyof T } {
  const invertedEnum = {} as { [K in T[keyof T]]: keyof T };
  for (const key in enumObj) {
    if (enumObj.hasOwnProperty(key)) {
      const value = enumObj[key];
      invertedEnum[value] = key;
    }
  }
  return invertedEnum;
}
