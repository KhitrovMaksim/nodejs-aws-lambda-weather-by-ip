const { promisify } = require('util');
const https = require('https');

class HttpClient {
  request(data) {
    const url = new URL(data.url);
    const httpModule = this.getHttpModule(url.protocol);
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
    };

    const getStreamData = (stream) =>
      new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () => {
          const dataBuffer = Buffer.concat(chunks).toString();
          resolve(dataBuffer);
        });
        stream.on('error', (error) => reject(error));
      });

    // eslint-disable-next-line no-shadow
    httpModule.get[promisify.custom] = (options) =>
      new Promise((resolve, reject) => {
        httpModule
          .get(options, (res) => {
            getStreamData(res)
              .then((json) => {
                if (res.statusCode !== 200) {
                  const message = `Request to ${url} failed with status code ${res.statusCode}`;
                  const error = new Error(`${message}\n${json}`);
                  reject(error);
                  return;
                }

                const contentType = res.headers['content-type'];
                if (!contentType.startsWith('application/json')) {
                  const error = new Error(`Invalid Content-Type: ${contentType}`);
                  res.resume();
                  reject(error);
                  return;
                }

                let object = null;
                try {
                  object = JSON.parse(json);
                } catch (error) {
                  reject(error);
                  return;
                }
                resolve(object);
              })
              .catch((err) => {
                reject(err);
              });
          })
          .on('error', (e) => {
            // eslint-disable-next-line no-console
            console.error(e);
          });
      });
    const get = promisify(https.get);

    return get(options);
  }

  // eslint-disable-next-line consistent-return
  getHttpModule(protocol) {
    if (protocol === 'https:') {
      return require('https');
    }
    if (protocol === 'http:') {
      return require('http');
    }
  }
}

module.exports = new HttpClient();
