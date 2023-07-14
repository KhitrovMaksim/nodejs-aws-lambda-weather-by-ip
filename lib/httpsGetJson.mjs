import https from 'https';
import { getStreamData } from './getStreamData.mjs';

export function httpsGetJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        getStreamData(res, (err, json) => {
          if (err) {
            reject(err);
            return;
          }

          if (res.statusCode !== 200) {
            const message = `Request to ${url} failed with status code ${res.statusCode}`;
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
      })
      .on('error', (error) => reject(error));
  });
}
