import WeatherInfo from "./WeatherInfo";

const CountryInfo = ({ country }) => {
  return (
    <>
      <section>
        <h2>{country.name.common}</h2>
        <div>
          capital: {country.captial}
          <br />
          area: {country.area}
        </div>
        <h3>lanuages</h3>
        <ul>
          {Object.values(country.languages).map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <div>
          <img src={country.flags.png} alt={country.flags.alt} />
        </div>
      </section>
      <WeatherInfo country={country} />
    </>
  );
};
export default CountryInfo;
