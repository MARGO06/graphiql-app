export function dateToUnixEpoch(creationDate: Date): number {
  const date = creationDate instanceof Date ? creationDate : new Date(creationDate);
  /* c8 ignore next 3 */
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  return Math.floor(date.getTime() / 1000);
}
