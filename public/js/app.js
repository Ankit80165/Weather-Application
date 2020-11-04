const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const pallate = document.querySelector('.close');
const suggestions = document.querySelector('.suggestions');

// for styling purposes
const temp = document.querySelector('.temp');
const feels = document.querySelector('.feels');
const humidity = document.querySelector('.humidity');
const title = document.querySelector('.title');
const displayMessage = document.querySelector('.displayMessage');
displayMessage.style.display = 'none';
function clickingList() {
	input.value = this.textContent;
	suggestions.style.display = 'none';
}
function displayMatches() {
	if (!this.value) {
		displayMessage.style.display = 'block';
		suggestions.style.display = 'none';
	} else {
		displayMessage.style.display = 'none';
		suggestions.style.display = 'block';
		const address = encodeURIComponent(this.value);
		const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYW5raXRyZWlnbnM5OTkiLCJhIjoiY2tneDYyZ3N0MGd2ZDJ6cG5wZmt0N3ptNiJ9.AMRSO42wJCldpXM-KVMfTQ`;
		fetch(url).then(response => {
			response.json().then(data => {
				if (data.features.length > 0) {
					const places = data.features.map(el => {
						return `<li>${el.place_name}</li>`;
					})
					const html = places.join('');
					suggestions.innerHTML = html;
					const suggestion = document.querySelectorAll('.suggestions li');
					for (const ele of suggestion) {
						ele.style.cursor = 'pointer';
						ele.addEventListener('click', clickingList);
					}
				} else {
					const html = `<li>Please try something else...</li>`;
					suggestions.innerHTML = html;
				}
			})
		}).catch(err => {
			const html = `<li>Unalbe to fetch loaction. Try again !</li>`;
			suggestions.innerHTML = html;
		})
	}
}
input.addEventListener('keyup', displayMatches);
weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();

	temp.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
	feels.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
	humidity.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

	title.textContent = 'Loading...';
	const location = input.value;
	console.log(typeof(input.value));
	const url = `/weather?address=${location}`;
	fetch(url).then(res => {
		res.json().then(data => {
			if (data.error) {
				console.log(data.error);
				temp.innerHTML = `<p>${data.error}</p>`;
				feels.innerHTML = `<p>${data.error}</p>`;
				humidity.innerHTML = `<p>${data.error}</p>`;
				title.textContent = 'Unable to Fetch';
			} else {
				// console.log(data.location);
				// console.log(data.forecast);
				let f1 = (data.forecast.temp) * 9 / 5 + 32;
				f1 = f1.toFixed(1);

				let f2 = (data.forecast.feels_like) * 9 / 5 + 32;
				f2 = f2.toFixed(1);
				title.textContent = data.location;
				temp.innerHTML = `<p>Current : ${data.forecast.temp}&#8451;/${f1}&#8457;</p>`;

				feels.innerHTML = `<p>Temperature : ${data.forecast.feels_like}&#8451;/${f2}&#8457;</p>`;

				humidity.innerHTML = `<p>Near About : ${data.forecast.humidity}%</p>`;
			}
		})
	})
});
