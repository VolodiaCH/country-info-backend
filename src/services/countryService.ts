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

export const fetchCountryInfo = async (countryCode: string) => {
  try {
    const [bordersResponse, flagResponse] = await Promise.all([
      axios.get(`${API_BASE_URL}/CountryInfo/${countryCode}`).catch(() => null),
      axios.post(FLAG_API_URL, { iso2: countryCode }).catch(() => null),
    ]);

    const countryName = bordersResponse?.data?.commonName;
    const borders = bordersResponse?.data || [];

    const populationResponse =
      countryName !== null
        ? await axios
            .post(POPULATION_API_URL, { country: countryName })
            .catch(() => null)
        : null;

    const population = populationResponse?.data?.data?.populationCounts || null;
    const flag = flagResponse?.data?.data?.flag || null;

    return {
      borders,
      population: Array.isArray(population)
        ? population[population.length - 1]
        : null,
      flag,
    };
  } catch (error) {
    console.error("Failed to fetch country information:", error);
    throw error;
  }
};
