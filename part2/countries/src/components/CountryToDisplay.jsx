import CountryInfo from "./CountryInfo";

const CountryToDisplay = ({ filteredCountry, onShowInfo }) => {
  const sortedCountries = filteredCountry.toSorted(
    (a, b) => a.name.common > b.name.common
  );

  if (filteredCountry.length === 0) return null;

  return (
    <div>
      {filteredCountry.length === 1 ? (
        <CountryInfo country={filteredCountry[0]} />
      ) : filteredCountry.length <= 10 ? (
        sortedCountries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}{" "}
            <button onClick={() => onShowInfo(country.name.common)}>
              show
            </button>
          </div>
        ))
      ) : (
        "Too many matches, specify another filter"
      )}
    </div>
  );
};

export default CountryToDisplay;
