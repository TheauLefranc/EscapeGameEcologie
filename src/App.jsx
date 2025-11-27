import { useState, useEffect } from 'react';
import EuropeMap from "./components/EuropeMap";
import * as d3 from "d3";

function App() {
  const [etsData, setEtsData] = useState({});
  const [years, setYears] = useState([]);
  const [currentYear, setCurrentYear] = useState(2005);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [globalMax, setGlobalMax] = useState(0);

  useEffect(() => {
    d3.dsv(";", "/data/ETS.csv").then((data) => {
      const filteredData = data.filter(d => 
        d["Main Activity Code"] === "20-99" &&
        d["Unit"] === "tonne of CO2 equ." &&
        d["ETS information"] === "2. Verified emissions" &&
        d["Country Code"] !== "All Countries"
      );

      const uniqueYears = [...new Set(filteredData.map(d => parseInt(d.Year)))].sort((a, b) => a - b);
      setYears(uniqueYears);
      if (uniqueYears.length > 0) setCurrentYear(uniqueYears[0]);

      const processedData = {};
      let maxVal = 0;

      filteredData.forEach(row => {
        const year = parseInt(row.Year);
        // MODIFICATION ICI : On utilise le nom du pays (Country) au lieu du code
        // pour faire le lien avec NAME_ENGL dans le JSON
        const countryName = row["Country"]; 
        const value = parseFloat(row.Value);

        if (!processedData[year]) processedData[year] = {};
        
        // On stocke la valeur associée au nom du pays
        processedData[year][countryName] = value;

        if (value > maxVal) maxVal = value;
      });

      setEtsData(processedData);
      setGlobalMax(maxVal);
      setDataLoaded(true);
    });
  }, []);

  const handleYearChange = (event) => {
    setCurrentYear(parseInt(event.target.value));
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ textAlign: "center", fontFamily: "Roboto, sans-serif" }}>
        Escape game : Le marché des crédits carbon en Europe
      </h1>
      
      {dataLoaded && years.length > 0 && (
        <div style={{ 
          marginBottom: "20px", 
          fontFamily: "Roboto, sans-serif", 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center",
          background: "#2b2b2b",
          padding: "15px",
          borderRadius: "8px",
          color: "white"
        }}>
          <label htmlFor="year-slider" style={{ marginBottom: "10px", fontSize: "1.2em" }}>
            Année : <strong>{currentYear}</strong>
          </label>
          <input 
            id="year-slider"
            type="range" 
            min={years[0]} 
            max={years[years.length - 1]} 
            value={currentYear} 
            onChange={handleYearChange}
            step="1"
            style={{ width: "300px", cursor: "pointer" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", width: "300px", fontSize: "0.8em", marginTop: "5px" }}>
            <span>{years[0]}</span>
            <span>{years[years.length - 1]}</span>
          </div>
        </div>
      )}

      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <EuropeMap 
          data={etsData[currentYear] || {}} 
          maxVal={globalMax}
        />
      </div>
    </div>
  );
}

export default App;