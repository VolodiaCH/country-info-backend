import axios from "axios";

const API_BASE_URL = "https://date.nager.at/api/v3";
const POPULATION_API_URL =
  "https://countriesnow.space/api/v0.1/countries/population";
const FLAG_API_URL =
  "https://countriesnow.space/api/v0.1/countries/flag/images";

export const fetchAvailableCountries = async () => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/AvailableCountries`);
    return data;
  } catch (error) {
    console.error("Failed to fetch available countries:", error);
    throw error;
  }
};

/* 
  When we are fetching data at first, in fetchAvailableCountries the country codes comes in ISO2, the only code we have and can use.  
  When fetching flag we can use this code, but it happens so there is no data about the flag, so it responds with 404.  
  When fetching the population we can only use ISO3 which we don't have or instead, we can use country name, which we also don't have.  
  So we should receive data from borderResponse, so now we have commonName and officialName, but in API documentation  
  it's not specified which exect country name should we use when fetching population. So I use commonName, because it usually works. 
  But anyway it can also respond with 404. If the flag or population responded with 404, 
  we just return null instead of them so we can just not display them on frontend. If couldn't find any data on borders, then it's also null
*/
export const fetchCountryInfo = async (countryCode: string) => {
  try {
    const [bordersResponse, flagResponse] = await Promise.all([
      axios.get(`${API_BASE_URL}/CountryInfo/${countryCode}`).catch(() => null),
      axios.post(FLAG_API_URL, { iso2: countryCode }).catch(() => null),
    ]);

    const countryName = bordersResponse?.data?.commonName;
    const borders = bordersResponse?.data || null;

    let populationResponse = null;
    if (countryName) {
      populationResponse = await axios
        .post(POPULATION_API_URL, { country: countryName })
        .catch(() => null);
    }

    const population = populationResponse?.data?.data?.populationCounts || null;
    const flag = flagResponse?.data?.data?.flag || null;

    return {
      borders,
      population,
      flag,
    };
  } catch (error) {
    console.error("Failed to fetch country information:", error);
    throw error;
  }
};
