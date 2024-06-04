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