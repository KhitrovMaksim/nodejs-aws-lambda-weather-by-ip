const HttpClient = require('./http.client');

class IpStackApiClient {
  async getLocation(apiKey, ip) {
    const urlIpStackAPI = `http://api.ipstack.com/${ip}?access_key=${apiKey}`;
    const response = new HttpClient(urlIpStackAPI);
    const location = await response.getJsonData();
    return location;
  }
}

module.exports = new IpStackApiClient();
