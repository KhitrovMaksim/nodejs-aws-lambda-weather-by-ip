export function ipStackApiResponseParser(response) {
  const { latitude, longitude } = response;
  return { latitude, longitude };
}
