const axios = require('axios');

const geoLocationFinder = (address, callBack) => {

	const geocoding = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYW5raXRyZWlnbnM5OTkiLCJhIjoiY2tneDYyZ3N0MGd2ZDJ6cG5wZmt0N3ptNiJ9.AMRSO42wJCldpXM-KVMfTQ&limit=1`;

	axios.get(geocoding).then((response) => {
		if (response.data.features.length > 0) {
			const latitude = response.data.features[0].center[1];
			const longitude = response.data.features[0].center[0];
			const location = response.data.features[0].place_name;
			callBack(undefined, {
				latitude: latitude,
				longitude: longitude,
				location: location
			});
		} else {
			callBack('Unable to find the location!', undefined);
		}

	}).catch((error) => {
		// console.log('Unable to connect with location services');
		callBack('Unable to connect with location services!', undefined);
	})
}

module.exports = geoLocationFinder;
