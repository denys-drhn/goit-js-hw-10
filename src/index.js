import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';

const refs = {
	textInput: document.querySelector('#search-box'),
	countryList: document.querySelector('.country-list'),
	countryInfo: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

refs.textInput.addEventListener('input', debounce(onSearchBoxInput, 500));

function onSearchBoxInput(event) {
	let textInput = event.target.value.trim();

	if (textInput.length > 0) {

fetchCountries(`${textInput}`)
	.then(data => {
// если не пришел промис
		if (!data) {
			clearMarkup()
			return [];
		}
//если значений больше 10
		if (data.length > 10) {
			clearMarkup();
			Notify.info("Too many matches found. Please enter a more specific name.");
		}
//если два и более значений
		if (data.length >= 2 && data.length < 9) {
			makeMarkupCountriesList(data);
		}
//если одно значение
		if (data.length === 1) {
			makeMarkupCountryInfo(data);
		}
	});
	} else {
		// console.log('не запрашиваем');
	}
};

function clearMarkup() {
	refs.countryList.innerHTML = '';
	refs.countryInfo.innerHTML = '';
};

function makeMarkupCountryInfo(data) {
	const markup = `<div style="display: flex; align-items: center;">
	<img src="${data[0].flags.svg}" alt="${data[0].flags.alt}" width="30" height="30">
	<span style="font-size: 30px; font-weight: bold; padding-left: 10px;">${data[0].name.common}</span>
	</div>
	<p><b>Capital:</b> ${data[0].capital}</p>
	<p><b>Population:</b> ${data[0].population}</p>
	<p><b>Languages:</b> ${Object.values(data[0].languages).join(', ')}</p>`;
	refs.countryList.innerHTML = '';
	refs.countryInfo.innerHTML = markup;
};

function makeMarkupCountriesList(data) {
	const markup = data.map((country) => `<li style="display: flex; align-items: center;">
	<img src="${country.flags.svg}" alt="${country.flags.alt}" width="30" height="30"> 
	<span style="font-size: 20px; padding-left: 10px;">${country.name.common}</span>
	</li>`).join("");
	refs.countryInfo.innerHTML = '';
	refs.countryList.innerHTML = markup;
};


// fetchCountries('ukr')
// 	.then(data => {
// 		// console.log(data);
// 		if (data.length > 9) {
// 			Notify.failure("Too many matches found. Please enter a more specific name.");
// 		}
// 		return data;
// 	}).then(listOfCountries => {
// 		console.log(listOfCountries);
// 		if (listOfCountries.length >= 2 && listOfCountries.length < 9) {
// 			console.log('list of countries');
// 			// return listOfCountries;
// 			const markup = listOfCountries.map((country) => `<li style="display: flex; align-items: center;">
// 		<img src="${country.flags.svg}" alt="${country.flags.alt}" width="30" height="30"> 
// 		<span style="font-size: 20px; padding-left: 10px;">${country.name.common}</span>
// 	</li>`).join("");
// 			refs.countryList.insertAdjacentHTML("beforeend", markup);
// 		}

// 		if (listOfCountries.length === 1) {
// 			// console.log(listOfCountries[0].name.official);
// 			console.log('one country');
// 			refs.countryList.innerHTML = `
// 	<li style="display: flex; align-items: center;">
// 		<img src="${listOfCountries[0].flags.svg}" alt="${listOfCountries[0].flags.alt}" width="30" height="30"> 
// 		<span style="font-size: 30px; font-weight: bold; padding-left: 10px;">${listOfCountries[0].name.common}</span>
// 	</li>`;
// 			refs.countryInfo.innerHTML = `<p><b>Capital:</b> ${listOfCountries[0].capital}</p>
// 			<p><b>Population:</b> ${listOfCountries[0].population}</p>
// 			<p><b>Languages:</b> ${Object.values(listOfCountries[0].languages).join(', ')}</p>`;
// 		}

// 		return listOfCountries;
// 	});

// it work function ==============================================
// function onSearchBoxInput(event) {
// 	let textInput = event.target.value.trim();
// 	// console.log(textInput);

// 	if (textInput.length > 0) {

// fetchCountries(`${textInput}`)
// 	.then(data => {
// 		if (!data) {			
// 			refs.countryList.innerHTML = '';
// 			refs.countryInfo.innerHTML = '';
//         return [];
//     }
// 		// console.log(data);
// 		if (data.length > 9) {
// 			refs.countryList.innerHTML = '';
// 			refs.countryInfo.innerHTML = '';
// 			Notify.info("Too many matches found. Please enter a more specific name.");
// 		}
// 		return data;
// 	}).then(listOfCountries => {
// 		// console.log(listOfCountries);
// 		if (listOfCountries.length >= 2 && listOfCountries.length < 9) {
// 			// console.log('list of countries');
// 			// return listOfCountries;
// 			const markup = listOfCountries.map((country) => `<li style="display: flex; align-items: center;">
// 		<img src="${country.flags.svg}" alt="${country.flags.alt}" width="30" height="30"> 
// 		<span style="font-size: 20px; padding-left: 10px;">${country.name.common}</span>
// 	</li>`).join("");
// 			refs.countryInfo.innerHTML = ''
// 			refs.countryList.innerHTML= markup;
// 		}

// 		if (listOfCountries.length === 1) {
// 			// console.log(listOfCountries[0].name.official);
// 			// console.log('one country');
// 			refs.countryList.innerHTML = `
// 	<li style="display: flex; align-items: center;">
// 		<img src="${listOfCountries[0].flags.svg}" alt="${listOfCountries[0].flags.alt}" width="30" height="30"> 
// 		<span style="font-size: 30px; font-weight: bold; padding-left: 10px;">${listOfCountries[0].name.common}</span>
// 	</li>`;
// 			refs.countryInfo.innerHTML = `<p><b>Capital:</b> ${listOfCountries[0].capital}</p>
// 			<p><b>Population:</b> ${listOfCountries[0].population}</p>
// 			<p><b>Languages:</b> ${Object.values(listOfCountries[0].languages).join(', ')}</p>`;
// 		}

// 		return listOfCountries;
// 	});

// 	} else {
// 		// console.log('не запрашиваем');
// 	}
// };

// second work function
// function onSearchBoxInput(event) {
// 	let textInput = event.target.value.trim();
// 	// console.log(textInput);

// 	if (textInput.length > 0) {

// fetchCountries(`${textInput}`)
// 	.then(data => {
// 		if (!data) {			
// 			refs.countryList.innerHTML = '';
// 			refs.countryInfo.innerHTML = '';
//         return [];
//     }
// 		// console.log(data);
// 		if (data.length > 9) {
// 			refs.countryList.innerHTML = '';
// 			refs.countryInfo.innerHTML = '';
// 			Notify.info("Too many matches found. Please enter a more specific name.");
// 		}
// 		return data;
// 	}).then(listOfCountries => {
// 		// console.log(listOfCountries);
// 		if (listOfCountries.length >= 2 && listOfCountries.length < 9) {
// 			// console.log('list of countries');
// 			// return listOfCountries;
// 			const markupCountriesList = makeMarkupCountriesList(listOfCountries);
// 			refs.countryInfo.innerHTML = '';
// 			refs.countryList.innerHTML= markupCountriesList;
// 		}

// 		if (listOfCountries.length === 1) {
// 			// console.log(listOfCountries[0].name.official);
// 			// console.log('one country');
// 			const markupCountry = makeMarkupCountry(listOfCountries);
// 			refs.countryList.innerHTML = markupCountry;
// 			const markupCountryInfo = makeMarkupCountryInfo(listOfCountries);
// 			refs.countryInfo.innerHTML = markupCountryInfo;
// 		}

// 		return listOfCountries;
// 	});

// 	} else {
// 		// console.log('не запрашиваем');
// 	}
// };

// function makeMarkupCountryInfo(data) {
// 	return `<p><b>Capital:</b> ${data[0].capital}</p>
// 			<p><b>Population:</b> ${data[0].population}</p>
// 			<p><b>Languages:</b> ${Object.values(data[0].languages).join(', ')}</p>`;
// };