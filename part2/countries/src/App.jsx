import axios from "axios";
import { useEffect, useState } from "react";
import countryService from "./services/countries";
import CountryToDisplay from "./components/CountryToDisplay";

const App = () => {
  const [query, setQeury] = useState("");
  const [countries, setCountryCache] = useState([]);
  const [filteredCountry, setFilteredCountry] = useState([]);

  useEffect(() => {
    if (countries.length === 0) fetchCountries();
    filteredCountries();
  }, [query]);

  const filteredCountries = () => {
    const filtered =
      query.length === 0
        ? []
        : countries.filter((c) => {
            return c.name.common.toLowerCase().includes(query.toLowerCase());
          });
    setFilteredCountry(filtered);
  };

  const fetchCountries = () => {
    countryService.getCountries().then((countries) => {
      setCountryCache(countries);
    });
  };

  const handleQueryChange = (e) => {
    setQeury(e.target.value);
  };

  const handleSelectCountry = (country) => {
    setQeury(country);
  };

  if (countries.length === 0) return <div>Loading...</div>;

  return (
    <div>
      <div>
        find countries:{" "}
        <input type="text" value={query} onChange={handleQueryChange} />
      </div>
      <CountryToDisplay
        filteredCountry={filteredCountry}
        onShowInfo={handleSelectCountry}
      />
    </div>
  );
};
export default App;
