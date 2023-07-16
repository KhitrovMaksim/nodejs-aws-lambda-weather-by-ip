const HttpClient = require('./http.client');

class OpenWeatherApiClient {
  async getWeatherForecast(latitude, longitude, token) {
    const urlOpenWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${token}&units=metric`;
    const response = new HttpClient(urlOpenWeatherAPI);
    const weatherForecast = await response.request();
    return weatherForecast;
  }

  getOnlyMainData(weatherForecast) {
    const { weather, main, name, sys } = weatherForecast;
    const { description } = weather[0];
    const { country } = sys;
    const { temp } = main;
    return {
      temperature: temp,
      country,
      place: name,
      description,
    };
  }
}

module.exports = new OpenWeatherApiClient();
