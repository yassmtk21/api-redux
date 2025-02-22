export const parseName = (word) => {
  return word[0].toUpperCase() + word.substring(1);
};

export const url = () => {
  const url = window.location.href.split("/");
  const foundUrl = url.splice(3, url.length);
  return foundUrl.join("/");
};
