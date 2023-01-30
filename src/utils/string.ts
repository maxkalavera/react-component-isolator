export function getFloatValues(
  value: string,
  regex = /[+-]?\d+(\.\d+)?/g
): number[] {
  const matchedValue = value.match(regex);

  if (matchedValue === null) {
    return [0.0];
  }
  return matchedValue.map(function (v) {
    return parseFloat(v);
  });
}
