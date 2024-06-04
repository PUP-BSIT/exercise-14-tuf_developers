async function searchCountry() {
    const inputCountry = document.querySelector('#input_country').value;
    try {
        const res = 
            await fetch(`https://restcountries.com/v3.1/name/${inputCountry}`);
        if (!res.ok) {
            throw new Error('Failed to fetch country data');
        }
        const data = await res.json();
        if (data && data.length) {
            const country = data[0];
            const details = document.querySelector('#country_info');
            details.innerHTML = `<h2>${country.name.common}</h2>
                                 <p>Region: ${country.region}</p>
                                 <p>Capital: ${country.capital 
                                    ? country.capital.join(', ') : 'N/A'}</p>
                                 <p>Population: ${country.population}</p>
                                 <p>Area: ${country.area} sq km</p>
                                 <p>Language: ${country.languages ? 
                                    Object.values(country.languages).join(', ') 
                                        : 'N/A'}</p>`;

            const regionRes = await 
            fetch(`https://restcountries.com/v3.1/region/${country.region}`);
            if (!regionRes.ok) {
                throw new Error('Failed to fetch region data');
            }
            const regionData = await regionRes.json();

            const region = document.querySelector('#region_countries');
            region.innerHTML = '<h2>Other Countries in the Same Region</h2>';
            regionData.forEach(function(c) {
                if (c && c.name && c.name.common !== country.name.common) {
                    region.innerHTML += `<p>${c.name.common}</p>`;
                }
            });
        } else {
            alert('Country not found. Please enter a valid country name.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred. Please try again later.');
    }
}