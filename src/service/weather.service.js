class WeatherService {
  getWeatherForecast(ip) {
    const weatherForecastData = {
      temperature: ip,
      country: 'AM',
      place: 'Yerevan',
      description: 'rainy',
    };
    return weatherForecastData;
  }
}

module.exports = new WeatherService();
