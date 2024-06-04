const country = document.querySelector("#country");
const sameRegion = document.querySelector("#same_region");
const inputCountry = document.querySelector("#input_country");

function getCountry() {
    displayLoading();
	fetch(`https://restcountries.com/v3.1/name/${inputCountry.value}`)
		.then((response) => response.json())
		.then((data) => displayCountry(data, country, 0))
		.catch((error) => displayError(error, country));
}

function getCountriesOfSameRegion(region) {
    fetch(`https://restcountries.com/v3.1/region/${region}`)
		.then((response) => response.json())
		.then((data) => displayCountriesOfSameRegion(data))
		.catch((error) => console.log(error));
}

function displayCountry(data, container, type=0) {
	if(isStatusError(data)) return;

    const TYPE = {
        SINGLE: 0,
        MULTIPLE: 1
    };

	const countryData = (type == TYPE.SINGLE)? data[0] : data;

	const capital = getContainerTemplate("Capital", countryData.capital);
	const region = getContainerTemplate("Region", countryData.region);
	const population = getContainerTemplate("Population", 
		countryData.population.toLocaleString());
	const languages = getLanguages(countryData.languages);
    const currencies = getCurrencies(countryData.currencies);

    const htmlContent = `<div class='country-container'>
            			 	<div class='name'>${countryData.name.common}
						 		<img src='${countryData.flags.png}'>
						 	</div>
            			 	<div class='capital'>${capital}</div>
            			 	<div class='region'>${region}</div>
						 	<div class='population'>${population}</div>
            			 	<div class='languages'>${languages}</div>
             			 	<div class='currency'>${currencies}</div>
        				 </div>`;

    switch(type) {
        case TYPE.SINGLE:
            container.innerHTML = htmlContent + `<h2>Countries in the same
                region:</h2>`;
            break;
        case TYPE.MULTIPLE:
            container.innerHTML += htmlContent;
            return;
    }

    getCountriesOfSameRegion(countryData.region);
}

function displayCountriesOfSameRegion(data) {
	for (item of data) {
        if(!item.name) return;

	    displayCountry(item, sameRegion, 1);
	}
}

function displayLoading() {
    country.innerHTML = 'Loading... Fetching content...';
}

function getContainerTemplate(key, value) {
	return `<div>${key}: <span>${value}</span></div>`;
}

function getCurrencies(currencies) {
	let currenciesElement = "Currencies:";

	for (const key in currencies) {
		currenciesElement += `<div>${key}</div>`;
	}

	return currenciesElement;
}

function getLanguages(languages) {
	let languagesElement = "Languages:";

	for (const key in languages) {
		languagesElement += `<div>${languages[key]}</div>`;
	}

	return languagesElement;
}

function displayError(error, container) {
	container.innerHTML = `${error}. Server took too long to respond.
		Please try again later.`;
}

function isStatusError(data) {
	const ERROR_CODE = 404;
	return data?.status == ERROR_CODE;
}