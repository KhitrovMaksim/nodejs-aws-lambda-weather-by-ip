const IpStackApiClient = require('../client/ipStackApi.client');
const OpenWeatherApiClient = require('../client/openWeatherApi.client');
const { TOKEN_WEATHER_API, TOKEN_IP_STACK_API } = require('../config');

class WeatherService {
  async getWeatherForecast(ip) {
    const { latitude, longitude } = await IpStackApiClient.getLocation(TOKEN_IP_STACK_API, ip);
    const weatherForecast = await OpenWeatherApiClient.getWeatherForecast(
      latitude,
      longitude,
      TOKEN_WEATHER_API,
    );
    const weather = OpenWeatherApiClient.getOnlyMainData(weatherForecast);
    return weather;
  }
}

module.exports = new WeatherService();
