const country = document.querySelector("#country");
const sameRegion = document.querySelector("#same_region");
const inputCountry = document.querySelector("#input_country");

function getCountry() {
    displayLoading();
	fetch(`https://restcountries.com/v3.1/name/${inputCountry.value}`);
}


function getCountriesOfSameRegion(region) {
    fetch(`https://restcountries.com/v3.1/region/${region}`);
}