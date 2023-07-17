const HttpClient = require('./http.client');

class IpStackApiClient {
  async getLocation(apiKey, ip) {
    const urlIpStackAPI = `http://api.ipstack.com/${ip}?access_key=${apiKey}`;
    const requestData = {
      url: urlIpStackAPI,
      method: 'GET',
      headers: {},
    };
    const location = await HttpClient.request(requestData);
    return location;
  }
}

module.exports = new IpStackApiClient();
