export const getIntColorValue = (v: number, isPercent = false) => {
  if (!v) {
    return v;
  }
  if (!isPercent) {
    return Math.round(v);
  }
  return Math.round(v * 100);
}