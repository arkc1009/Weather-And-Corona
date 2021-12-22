const makeDateToString = (date: Date): string => {
  const y = date.getFullYear();
  const m = `0${date.getMonth() + 1}`.slice(-2);
  const d = `0${date.getDate()}`.slice(-2);

  return `${y}${m}${d}`;
};

export const getCoronaDate = (): { startDate: string; endDate: string } => {
  const endDate = new Date();
  const startDate = new Date();

  startDate.setDate(endDate.getDate() - 8);

  return {
    startDate: makeDateToString(startDate),
    endDate: makeDateToString(endDate),
  };
};
