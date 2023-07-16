class HttpGetJsonClient {
  constructor(url) {
    this.url = new URL(url);
    this.http = this.#getHttpModule(this.url.protocol);
    this.options = {
      hostname: this.url.hostname,
      path: this.url.pathname + this.url.search,
    };
  }

  getResponseData() {
    return new Promise((resolve, reject) => {
      this.http.get(this.options, (res) => {
        this.#getStreamData(res, (err, json) => {
          if (err) {
            reject(err);
            return;
          }

          if (res.statusCode !== 200) {
            const message = `Request to ${this.url} failed with status code ${res.statusCode}`;
            reject(new Error(`${message}\n${json}`));
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
        });
      }).on('error', (e) => {
        console.error(e);
      });
    });
  }

  #getStreamData(stream, callback) {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => {
      const data = Buffer.concat(chunks).toString();
      callback(null, data);
    });
    stream.on('error', callback);
  }

  #getHttpModule(protocol) {
    if (protocol === 'https:') {
      return require('https');
    }
    if (protocol === 'http:') {
      return require('http');
    }
  }
}

module.exports = HttpGetJsonClient;
