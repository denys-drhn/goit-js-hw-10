import { Notify } from 'notiflix/build/notiflix-notify-aio'

export function fetchCountries(name) {
	const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
	return fetch(url)
		.then(response => {
			if (!response.ok) {
				return Notify.failure("Oops, there is no country with that name");
			}
		return response.json();
		}).catch(error => {
	console.log(error);
});
};