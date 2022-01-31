class HelpersClass {
  shortenText(text: string) {
    if (!text) return "";
    if (text.length < 150) return text;
    return `${text.substring(0, 150)}...`;
  }
}

const Helpers = new HelpersClass();
export default Helpers;