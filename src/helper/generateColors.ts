export function generateDistinctColors(count: number): string[] {
  const colors = [];
  const saturation = 70;
  const lightness = 60;

  for (let i = 0; i < count; i++) {
    const hue = Math.floor((360 / count) * i); // spread hues evenly
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }

  return colors;
}
