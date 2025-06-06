import { useState, useEffect } from "react";
import style from "./State.module.css";
const State = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const selectCountry = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setSelectedState("");
    setSelectedCity("");
  };

  const selectState = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedCity("");
  };

  const selectCity = (e) => {
    setSelectedCity(e.target.value);
  };

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch(
        "https://crio-location-selector.onrender.com/countries"
      );
      const data = await response.json();
      setCountries(data);
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry !== "") {
      const fetchStates = async () => {
        const response = await fetch(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
        );
        const data = await response.json();
        setStates(data);
      };
      fetchStates();
    }
  }, [selectedCountry]);
  useEffect(() => {
    if (selectedState !== "") {
      const fetchCities = async () => {
        const response = await fetch(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
        );
        const data = await response.json();
        setCities(data);
      };
      fetchCities();
    }
  }, [selectedState]);

  return (
    <>
      <h1>Select Location</h1>
      <div className={style.location}>
        <select value={selectedCountry} onChange={selectCountry}>
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <select
          value={selectedState}
          onChange={selectState}
          disabled={selectedCountry === ""}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          value={selectedCity}
          onChange={selectCity}
          disabled={selectedState === ""}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {selectedCountry && selectedCity && selectState && (
        <h5>
          <span className={style.h}>You Selected</span> {selectedCity},{" "}
          <span>{selectedState}</span>, <span>{selectedCountry}</span>
        </h5>
      )}
    </>
  );
};

export default State;
