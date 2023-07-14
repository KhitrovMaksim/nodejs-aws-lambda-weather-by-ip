export function openWeatherMapApiUrlBuilder(apiKey, latitude, longitude) {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
}
