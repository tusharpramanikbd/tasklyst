/** @format */

export function checkIfPastDate(date: Date): boolean {
  const today = new Date().setHours(0, 0, 0, 0);
  const selectedDate = date.setHours(0, 0, 0, 0);

  return selectedDate < today;
}
