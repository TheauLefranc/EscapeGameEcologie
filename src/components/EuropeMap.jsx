import { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

export default function EuropeMap() {
  const ref = useRef();

  useEffect(() => {
    let isMounted = true;
    const drawMap = async () => {
      try {
        d3.select(ref.current).selectAll("*").remove();

        const [world, csvData] = await Promise.all([
          d3.json("/data/Pays.json"),
          d3.csv("/data/aquisition_summary.csv")
        ]);

        if (!isMounted) return;

        const dataMap = new Map();
        csvData.forEach(row => {
          const countryName = row.TRANSFERRING_REGISTRY_NAME.trim(); 
          const amount = +row.TOTAL_AMOUNT; 
          dataMap.set(countryName, amount);
        });

        const width = 1200;
        const height = 600;

        const countries = topojson.feature(world, world.objects.CNTR_RG_20M_2024_4326);

        const projection = d3.geoMercator()
          .center([13, 54])
          .scale(500)
          .translate([width / 2, height / 2]);

        const path = d3.geoPath().projection(projection);

        const maxAmount = d3.max(csvData, d => +d.TOTAL_AMOUNT);
        const radiusScale = d3.scaleSqrt()
          .domain([0, maxAmount])
          .range([2, 25]);



        const svg = d3.select(ref.current)
          .append("svg")
          .attr("viewBox", [0, 0, width, height])
          .attr("width", width)
          .attr("height", height)
          .attr("style", "max-width: 100%; height: auto; background: #2b2b2b;") 
          .on("click", reset);

        const g = svg.append("g");
        const states = g.append("g")
          .selectAll("path")
          .data(countries.features)
          .join("path")
          .attr("fill", "#4447e9")
          .attr("stroke", "white")
          .attr("stroke-width", 0.5)
          .attr("cursor", "pointer")
          .attr("d", path)
          .on("click", clicked);

        states.append("title")
          .text(d => d.properties.NAME_FREN);
        const featuresWithData = countries.features.filter(d => {
            return dataMap.has(d.properties.NAME_ENGL);
        });

        g.append("g")
          .selectAll("circle")
          .data(featuresWithData)
          .join("circle")
          // Calculer la position x,y du centre du pays
          .attr("transform", d => `translate(${path.centroid(d)})`)
          .attr("r", d => {
             const amount = dataMap.get(d.properties.NAME_ENGL);
             return radiusScale(amount);
          })
          .attr("fill", "#ffcc00")
          .attr("fill-opacity", 0.7)
          .attr("stroke", "#fff")
          .attr("stroke-width", 1)
          .attr("pointer-events", "none") 
          .append("title") 
          .text(d => {
             const amount = dataMap.get(d.properties.NAME_ENGL);
             
             return `${d.properties.NAME_FREN}\nMontant: ${amount.toLocaleString()}`;
          });

        const zoom = d3.zoom()
          .scaleExtent([1, 8])
          .on("zoom", zoomed);

        svg.call(zoom);

        function reset() {
          states.transition().style("fill", "#4447e9");
          svg.transition().duration(750).call(
            zoom.transform,
            d3.zoomIdentity,
            d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
          );
        }

        function clicked(event, d) {
          const [[x0, y0], [x1, y1]] = path.bounds(d);
          event.stopPropagation();
          states.transition().style("fill", "#4447e9");
          d3.select(this).transition().style("fill", "#2a2dbf"); 
          svg.transition().duration(750).call(
            zoom.transform,
            d3.zoomIdentity
              .translate(width / 2, height / 2)
              .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
              .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
            d3.pointer(event, svg.node())
          );
        }

        function zoomed(event) {
          const { transform } = event;
          g.attr("transform", transform);
          g.attr("stroke-width", 1 / transform.k);
          g.selectAll("circle").attr("stroke-width", 1 / transform.k);
        }

      } catch (error) {
        console.error("Erreur lors du chargement de la carte:", error);
      }
    };

    drawMap();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full p-4">
      <div ref={ref} className="w-full flex justify-center" />
    </div>
  );
}