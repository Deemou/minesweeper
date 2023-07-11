export function padStartZero(num: number, digit: number): string {
  return String(num).padStart(digit, '0');
}
