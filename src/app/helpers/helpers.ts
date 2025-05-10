export function firstLetterToUpperCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeEachWord(str: string) {
  return str.replace(/\b\w/g, (word) => word.toUpperCase());
}

export function strToWebsite(str: string) {
  return `https://${str.toLowerCase()}`;
}
