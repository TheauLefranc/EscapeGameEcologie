import { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import * as viz from "geoviz";

export default function EuropeMap() {
  const ref = useRef();

  useEffect(() => {
    

    const world = d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");

    let svg = viz.create({ projection: d3.geoNaturalEarth1() });

    
    
  }, []);

  return <div ref={ref} style={{ width: "100%", textAlign: "center" }} />;
}
