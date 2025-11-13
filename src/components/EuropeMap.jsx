import { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
// geoviz n'est pas un module ES6 standard. On l'importe pour son "side effect" :
// il s'attache à l'objet window.
import "geoviz";

export default function EuropeMap() {
  const ref = useRef();
  console.log("Rendering EuropeMap component");
  useEffect(() => {
    // On vérifie que le composant est bien monté et que la librairie est chargée
    if (ref.current && window.viz) {
      // On accède à la librairie via window.viz
      const viz = window.viz;
      console.log("GeoViz version:", viz.version);
      // Création du SVG et centrage sur l'Europe 
      let svg = viz.create({
        projection: d3.geoConicConformal().center([15, 50]).scale(1000),
        container: ref.current,
      });

      // Chargement des données et affichage
      d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(
        (world) => {
          const countries = topojson.feature(world, world.objects.countries);
          viz.map(svg, countries, { fill: "#e0e0e0", stroke: "white" });
        }
      );
    }

  }, []);

  return <div ref={ref} style={{ width: "100%", textAlign: "center" }} />;
}
