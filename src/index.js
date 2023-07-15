const WeatherPresenter = require('./presenter/weather.presenter');
const WeatherService = require('./service/weather.service');

exports.controller = async (event, context, callback) => {
  const ip = event.requestContext.http.sourceIp;

  const weatherForecastData = WeatherService.getWeatherForecast(ip);
  const weatherSiteContent = WeatherPresenter.getHtml(weatherForecastData);

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html' },
    body: weatherSiteContent,
  };
};
