class WeatherPresenter {
  constructor(data) {
    this.temperature = data.temperature;
    this.country = data.country;
    this.place = data.place;
    this.description = data.description;
  }

  getHtml() {
    return ` \
    <html lang="en">\
    <head>\
    <meta charset="UTF-8">\
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">\
    <title>Weather forecast by your IP</title>\
    <body>\
    <div class="col-lg-8 mx-auto p-4 py-md-5">\
    <header class="d-flex align-items-center pb-3 mb-5 border-bottom">\
        <span class="fs-4">Weather forecast by your IP address</span>\
    </header>\
    <main>\
        <h1 class="text-body-emphasis">${this.temperature}°C</h1>\
        <p class="fs-5 col-md-8">Country: ${this.country}</p>\
        <p class="fs-5 col-md-8">Place: ${this.place}</p>\
        <p class="fs-5 col-md-8">Description: ${this.description}</p>\
    </main>\
    <footer class="pt-5 my-5 text-body-secondary border-top">\
        Created by Khitrov Maksim · © 2023\
    </footer>\
    </div>\
    </body>\
    </head>\
    </html>\
    `;
  }
}

module.exports = WeatherPresenter;
