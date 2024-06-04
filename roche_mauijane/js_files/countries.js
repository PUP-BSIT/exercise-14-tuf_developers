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

};