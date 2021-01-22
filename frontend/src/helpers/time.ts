/**
 * Returns the selected day as a date string
 * @return {string} - day objects date as string
 */
export function getDayAsString(day: Date) {
  let temp = day;
  if (temp.getTimezoneOffset() < 0) {
    temp = new Date(temp.valueOf() + 60_000 * -temp.getTimezoneOffset());
  } else {
    temp = new Date(temp.valueOf() - 60_000 * temp.getTimezoneOffset());
  }
  return temp.toISOString().split('T')[0];
}
