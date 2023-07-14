export function openWeatherMapApiResponseParser(response) {
  const { weather, main, name, sys } = response;
  const { description } = weather[0];
  const { country } = sys;
  const { temp } = main;

  return {
    country,
    place: name,
    temperature: temp,
    description,
  };
}
