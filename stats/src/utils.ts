export const dateStringToDate = (date: string): Date => {
  const dateParts = date.split('/').map((item: string): number => +item);

  return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
};
