import DataImport from "./DataImport";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

export default function Visu4() {
  const [v4nationalstate, setV4National] = useState(null);
  const [selectedCountries, setSelectedCountries] = useState(["Finland"]);
  const [colors, setColors] = useState([]);

  function randomRGB(){ //pyrkii arpomaan contrastia omaavan rgb-arvon
    const highLimit = 300;
    let red, green, blue;

    do{
      red = Math.floor(Math.random() * 256);
      green = Math.floor(Math.random() * 256);
      blue = Math.floor(Math.random() * 256);
    } while ((red + green + blue) < highLimit);

    return "rgb(" + red + ", " + green + ", " + blue + ")";
  }

  const handleInputChange = (event) => {
    const value = event.target.value;
    const matchingCountries = Object.keys(v4nationalstate || {}).filter(
      (country) => country.toLowerCase().startsWith(value.toLowerCase())
    );
  
    if (matchingCountries.length === 1) {
      const country = matchingCountries[0];
  
      if (!selectedCountries.includes(country)) {
        setSelectedCountries([...selectedCountries, country]);
        setColors([
          ...colors,
          randomRGB(),
        ]);
      }
    event.target.value = "";
    }
  };

  const path = `7/V4_National_CO2_emissions`;

  useEffect(() => {
    setV4National(null);
  }, [path]);

  let countriesData = null;
  if (v4nationalstate) {
    countriesData = selectedCountries.map((country, i) => ({
      country,
      data: v4nationalstate[country],
      color: colors[i],
    }));
  }
return (
  <div className="datalist-wrapper">
    <div className="search-wrapper">
      <div className="countries">
        {selectedCountries.map((country) => (
          <span key={country} className="selected-country">
            {country}
            <button onClick={() => setSelectedCountries(selectedCountries.filter(c => c !== country))}>
              &times;
            </button>
          </span>
        ))}
      </div>
      <input
        className="inside-search"
        type="search"
        onChange={handleInputChange}
        list="countryList"
      />
    </div>
    <datalist id="countryList">
      {v4nationalstate &&
        Object.keys(v4nationalstate).map((country) => (
          <option key={country} value={country} />
        ))}
    </datalist>
    <DataImport setData={setV4National} path={path} />
    {countriesData && <Graph countriesData={countriesData} />}
  </div>
);
}

function Graph({ countriesData }) {
  const allYears = countriesData.reduce((years, { data }) => {
    const countryYears = Object.keys(data).map(Number);
    return [...years, ...countryYears];
  }, []);
  const minYear = Math.min(...allYears);
  const maxYear = Math.max(...allYears);
  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => i + minYear);
  const datasets = countriesData.map(({ country, data, color }) => {
    const countryData = Array.from({ length: years.length }, () => null);
    Object.entries(data).forEach(([year, value]) => {
      const index = years.indexOf(Number(year));
      if (index !== -1) {
        countryData[index] = value;
      }
    });
    return {
      label: country,
      data: countryData,
      borderColor: color,
      backgroundColor: color,
      pointRadius: 1,
      tension: 0.4,
      yAxisID: "y",
    };
  });
  const data = {
    labels: years,
    datasets,
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        type: "linear",
      },
    },
  };
  return (
    <div className="chart">
      <h1>CO2 emissions by country</h1>
      <Line data={data} options={options} />
    </div>
  );
}

export function Visu4Information() {
  return (
    <div>
      <a
        href="https://www.icos-cp.eu/science-and-impact/global-carbon-budget/2021"
        target="_blank"
        rel="noreferrer"
      >
        National emissions data source
      </a>
    </div>
  );
}