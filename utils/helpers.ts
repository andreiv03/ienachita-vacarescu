export const shortenText = (length: number, text: string = "") => {
  if (text.length < length) return text;
  return `${text.substring(0, length)}...`;
}