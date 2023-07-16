const HttpGetJsonClient = require('./httpGetJson.client');

class IpStackApiClient {
  async getLocation(apiKey, ip) {
    const urlIpStackAPI = `http://api.ipstack.com/${ip}?access_key=${apiKey}`;
    const response = new HttpGetJsonClient(urlIpStackAPI);
    const location = await response.getResponseData();
    return location;
  }
}

module.exports = new IpStackApiClient();
