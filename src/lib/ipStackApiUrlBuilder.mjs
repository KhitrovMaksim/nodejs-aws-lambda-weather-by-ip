export function ipStackApiUrlBuilder(apiKey, ip) {
  return `http://api.ipstack.com/${ip}?access_key=${apiKey}`;
}
