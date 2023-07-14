import { httpsGetJson } from './lib/httpsGetJson.mjs';
import { httpGetJson } from './lib/httpGetJson.mjs';
import { ipStackApiUrlBuilder } from './lib/ipStackApiUrlBuilder.mjs';
import { ipStackApiResponseParser } from './lib/ipStackApiResponseParser.mjs';
import { openWeatherMapApiUrlBuilder } from './lib/openWeatherMapApiUrlBuilder.mjs';
import { openWeatherMapApiResponseParser } from './lib/openWeatherMapApiResponseParser.mjs';
import { getHtmlWeatherByIp } from './lib/getHtmlWeatherByIp.mjs';
import { TOKEN_WEATHER_API, IP_STACK_TOKEN } from './config.mjs';

export const handler = async (event, context, callback) => {
  try {
    const ip = event['requestContext']['http']['sourceIp'];

    const urlIpApi = ipStackApiUrlBuilder(IP_STACK_TOKEN, ip);
    const jsonIpApi = await httpGetJson(urlIpApi);
    const { latitude, longitude } = ipStackApiResponseParser(jsonIpApi);

    const urlWeatherApi = openWeatherMapApiUrlBuilder(TOKEN_WEATHER_API, latitude, longitude);
    const jsonWeatherApi = await httpsGetJson(urlWeatherApi);
    const parsedJsonWeatherApi = openWeatherMapApiResponseParser(jsonWeatherApi);

    const content = getHtmlWeatherByIp(parsedJsonWeatherApi);

    const response = {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: content,
    };

    return response;
  } catch (error) {
    return JSON.stringify(error);
  }
};
