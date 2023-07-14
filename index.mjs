import { httpsGetJson } from './lib/httpsGetJson.mjs';
import { openWeatherMapApiUrlBuilder } from './lib/openWeatherMapApiUrlBuilder.mjs';
import { openWeatherMapApiResponseParser } from './lib/openWeatherMapApiResponseParser.mjs';
import { TOKEN_WEATHER_API } from './config.mjs';

export const handler = async (event) => {
  const url = openWeatherMapApiUrlBuilder(TOKEN_WEATHER_API, '40.16557', '44.29462');

  const json = await httpsGetJson(url);

  const parsedJson = openWeatherMapApiResponseParser(json);

  const response = {
    statusCode: 200,
    body: JSON.stringify(parsedJson),
  };
  return response;
};
