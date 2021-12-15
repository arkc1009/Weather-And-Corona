export const evalExpires = (str: string) => {
  const numbers = str.split('*');

  let data: number = 1;
  for (let i of numbers) {
    data *= parseInt(i);
  }

  return data;
};
