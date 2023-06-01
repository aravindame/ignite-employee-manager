/**
 * Converts a camelCase string to snake_case.
 * @param {string} str - The camelCase string to be converted.
 * @returns {string} - The snake_case string.
 */

export const camelToSnakeCase = (str:string) =>
  str.replace(/[A-Z]/g, (letter:string) => `_${letter.toLowerCase()}`);
