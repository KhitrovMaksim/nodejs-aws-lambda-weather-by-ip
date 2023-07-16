class HttpClient {
  request(data) {
    const url = new URL(data.url);
    const httpModule = this.getHttpModule(url.protocol);
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
    };

    return new Promise((resolve, reject) => {
      const get = httpModule.get(options, (res) => {
        this.getStreamData(res)
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
      });

      get.on('error', (e) => {
        // eslint-disable-next-line no-console
        console.error(e);
      });
    });
  }

  getStreamData(stream) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => {
        const data = Buffer.concat(chunks).toString();
        resolve(data);
      });
      stream.on('error', (error) => reject(error));
    });
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
