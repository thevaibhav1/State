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
    try {
      const fetchCountries = async () => {
        const response = await fetch(
          "https://crio-location-selector.onrender.com/countries"
        );
        if (!response.ok) {
          console.log("Network response was not ok");
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCountries(data);
      };
      fetchCountries();
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  }, []);

  useEffect(() => {
    try {
      if (selectedCountry !== "") {
        const fetchStates = async () => {
          const response = await fetch(
            `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
          );
          if (!response.ok) {
            console.log("Network response was not ok");
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setStates(data);
        };
        fetchStates();
      }
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  }, [selectedCountry]);
  useEffect(() => {
    try {
      if (selectedState !== "") {
        const fetchCities = async () => {
          const response = await fetch(
            `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
          );
          if (!response.ok) {
            console.log("Network response was not ok");
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          setCities(data);
        };
        fetchCities();
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  }, [selectedState, selectedCountry]);
  // console.log(countries, states, cities);
  return (
    <>
      <h1>Select Location</h1>
      <div className={style.location}>
        <select value={selectedCountry} onChange={selectCountry}>
          <option value="select country">Select Country</option>
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
          <option value="select state">Select State</option>
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
          <option value="select city">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {selectedCountry && selectedCity && selectedState && (
        <span>
          You Selected {selectedCity}, {selectedState}, {selectedCountry}
        </span>
      )}
    </>
  );
};

export default State;
