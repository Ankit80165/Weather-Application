const axios = require('axios');

const forecast = (lat, lon, callback) => {
	const forecastUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4f7c7a626777b960adc765d8335b9965&units=metric`;
	axios.get(forecastUrl).then((res) => {
		const data = {
			...res.data.main,
			description: res.data.weather[0].description
		}
		callback(undefined, data);
	}).catch(error => {
		if (error.response) {
			if (error.response.data) {
				// console.log('Unable to find the location!');
				callback('Unable to find the location!', undefined);
			} else {
				// console.log('Something error occurs!');
				callback('Something error occurs!', undefined);
			}
		} else {
			// console.log('Unable to fetch current weather!');
			callback('Unable to fetch current weather!', undefined);
		}
	});
}
module.exports = forecast;
