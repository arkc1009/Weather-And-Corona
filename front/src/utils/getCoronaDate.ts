const makeString = (date: Date): string => {
  const y = date.getFullYear();
  const m = `0${date.getMonth() + 1}`.slice(-2);
  const d = `0${date.getDate()}`.slice(-2);

  return `${y}${m}${d}`;
};

export const getCoronaDate = (): { startDate: string; endDate: string } => {
  const endDate = new Date();
  const startDate = new Date(endDate);

  startDate.setDate(endDate.getDate() - 7);

  return {
    startDate: makeString(startDate),
    endDate: makeString(endDate),
  };
};
