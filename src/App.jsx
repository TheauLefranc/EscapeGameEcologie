import EuropeMap from "./components/EuropeMap";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center", fontFamily: "Roboto, sans-serif" }}>
        Carte d'Europe avec GeoViz + D3
      </h1>
      <EuropeMap />
    </div>
  );
}

export default App;
