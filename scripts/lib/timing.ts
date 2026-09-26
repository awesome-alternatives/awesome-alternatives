export function secondsSince(start: number): string {
  return ((performance.now() - start) / 1000).toFixed(1);
}

export async function timed<T>(phase: string, work: () => Promise<T>): Promise<T> {
  const start = performance.now();
  const result = await work();
  console.log(`phase ${phase}: ${secondsSince(start)} s`);
  return result;
}
