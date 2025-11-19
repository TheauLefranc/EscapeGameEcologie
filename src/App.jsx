import EuropeMap from "./components/EuropeMap";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center", fontFamily: "Roboto, sans-serif" }}>
        Escape game : Le marché des crédits carbon en Europe
      </h1>
      <div style={{ textAlign: "center", marginBottom: "20px", fontFamily: "Roboto, sans-serif" }}>
        <EuropeMap />
      </div>
    </div>
  );
}

export default App;
