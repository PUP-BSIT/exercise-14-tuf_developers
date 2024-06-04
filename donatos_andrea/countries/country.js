const submit = document.querySelector("button");

const searchCountry = () => {
  const txtBox = document.querySelector("#countryInput").value;

  const countryData = {
    countryRegion: "",
    countryInfo: {
      name: "",
      area: "",
      population: "",
      languages: [],
      currencies: {},
      capital: "",
      region: "",
      flag: "",
    },
    regionData: [],
  };

  fetch(`https://restcountries.com/v3.1/name/${txtBox}`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.length) throw new Error("Country not found");

      const [country] = data;
      countryData.countryRegion = country?.region;
      countryData.countryInfo = {
        name: country.name.common,
        area: country.area.toLocaleString(),
        population: country.population.toLocaleString(),
        languages: country.languages,
        currencies: country.currencies,
        capital: country.capital[0],
        region: country.region,
        flag: country.flags.png,
      };
      let region = country.region;
      const call = `https://restcountries.com/v3.1/region/${region}`;
      return fetch(call)
        .then((response) => response.json())
        .then((regionData) => {
          countryData.regionData = regionData;
        });
    })
    .then(() => {
      const { countryInfo, regionData } = countryData;
      document.querySelector("#countryDetails").innerHTML = `
                <h3>Country Information</h3>
                <img src="${countryInfo.flag}" alt="Flag of ${
        countryInfo.name
      }" />
                <p>Country Name: ${countryInfo.name}</p>
                <p>Population: ${countryInfo.population}</p>
                <p>Area: ${countryInfo.area}</p>
                <p>Currencies: ${Object.values(countryInfo.currencies)
                  .map((curr) => `${curr.name} (${curr.symbol})`)
                  .join(", ")}</p>
                <p>Capital City: ${countryInfo.capital}</p>
                <p>Region: ${countryInfo.region}</p>`;

      const countriesInRegion = regionData
        .map(
          (country) => `
                <div>
                    <img 
                        src="${country.flags.png}" 
                        alt="Flag of ${country.name.common}" />
                    <p>${country.name.common}</p>
                </div>`
        )
        .join("");

      document.querySelector("#countriesInRegion").innerHTML = `
                <h3 class="region-title">Countries in the Same Region</h3>
                <div class="countries-container">
                    ${countriesInRegion}
                </div>`;
    })
    .catch(() => {
      document.querySelector(
        "#countryDetails"
      ).innerHTML = `<p>Country not found</p>`;
      document.querySelector("#countriesInRegion").innerHTML = "";
    });
};

submit.addEventListener("click", searchCountry);
