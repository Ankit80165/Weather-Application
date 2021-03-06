const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocoding = require('./utils/geocoding.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 4000;

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../template/views'));
hbs.registerPartials(path.join(__dirname, '../template/partials'));
app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Ankit'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Ankit'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'Ankit'
	});
});
app.get('/products', (req, res) => {
	console.log(req.query);
	res.send({products: []})
})

app.get('/weather', (req, res) => {

	if (!req.query.address) {
		return res.send({error: 'please provide an address'})
	}

	geocoding(req.query.address, (response, {latitude, longitude, location, suggestions} = {}) => {
		if (response) {
			return res.send({error: response})
		}
		forecast(latitude, longitude, (responseWeather, weatherData) => {
			if (responseWeather) {
				return res.send({error: responseWeather});
			}
			return res.send({forecast: weatherData, location: location, address: req.query.address, suggestions: suggestions});
		});
	})
	// res.send({weather: 'sunny', wind: 'fast', temp: 27, address: req.query.address});
})
app.get('/help/*', (req, res) => {
	res.render('404', {
		title: 404,
		name: 'Ankit',
		errorMessage: 'Help article not found!'
	})
})
app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Ankit',
		errorMessage: 'Page not found!'
	})
})
app.listen(port, () => {
	console.log(`server start running at ${port}...`);
});
