export function splitString(string:string){
  return string.split("/")[string.split("/").length - 1]
}

export function getId(array: string[]): string[] {
  const url: string[] = [];

  array.forEach((episode) =>
    url.push(splitString(episode)),
  );

  return url;
}
