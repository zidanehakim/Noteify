export const arrayDivider = <T extends object>(
  arr: T[],
  part: number
): T[][] => {
  const result: T[][] = [];
  const totalParts = Math.ceil(arr.length / part); // Calculate how many parts will be created

  for (let i = 0; i < totalParts; i++) {
    result.push(arr.slice(i * part, (i + 1) * part));
  }

  return result;
};
