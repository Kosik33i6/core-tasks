export const isUrl = (value: string) => {
  if (!value) return true;
  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

  return urlRegex.test(value);
};