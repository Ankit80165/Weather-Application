const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const pallate = document.querySelector('.close');
// for styling purposes
const temp = document.querySelector('.temp');
const feels = document.querySelector('.feels');
const humidity = document.querySelector('.humidity');
const title = document.querySelector('.title');

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
