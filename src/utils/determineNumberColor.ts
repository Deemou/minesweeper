export function determineNumberColor(number: number): string {
  const colorMap: { [key: string]: string } = {
    0: '#878787',
    1: '#0B24FB',
    2: '#56AD54',
    3: '#FC0D1B',
    4: '#020B79',
    5: '#852123',
    6: '#278786',
    7: '#000000',
    8: '#808080'
  };

  return colorMap[number];
}
