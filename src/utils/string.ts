

export function getFloatValues(
  value: string, 
  regex: RegExp=/[+-]?\d+(\.\d+)?/g
): number[] {
  let matchedValue = value.match(regex);

  if (matchedValue === null) {
    return [0.0];
  }
  return matchedValue.map(function(v) { 
    return parseFloat(v); 
  });
}