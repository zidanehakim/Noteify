export const dayDivider = <T extends object>(arr: T[], part: number): T[] => {
  return arr.filter((_, index) => index % part === 0);
};
