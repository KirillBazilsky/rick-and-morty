export function getLastSegment(path: string) {
  const segment = path.split("/");

  return segment[segment.length - 1];
}
export function getUrl(paths: string[]): string[] {
  
  return paths.map(getLastSegment)
}
