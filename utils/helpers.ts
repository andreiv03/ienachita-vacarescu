class Helpers {
  shortenText(text: string, length: number) {
    if (!text) return "";
    if (text.length < length) return text;
    return `${text.substring(0, length)}...`;
  }
};

const helpers = new Helpers();
export default helpers;