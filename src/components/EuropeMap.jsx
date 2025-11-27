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
        const world = await d3.json("/data/Pays.json");
        const countries = topojson.feature(world, world.objects.CNTR_RG_20M_2024_4326);
        const width = 1200;
        const height = 600;
        if (!isMounted) return;
        
        const zoom = d3.zoom()
          .scaleExtent([1, 8])
          .on("zoom", zoomed);
        
        // Créer le SVG directement dans le conteneur
        const svg = d3.select(ref.current)
          .append("svg")
          .attr("viewBox", [0, 0, width, height])
          .attr("width", width)
          .attr("height", height)
          .attr("style", "max-width: 100%; height: auto;")
          .on("click", reset);
        
        const g = svg.append("g");
        
        const path = d3.geoPath().projection(
          d3.geoMercator()
            .center([13, 54]) 
            .scale(500)
            .translate([width / 2, height / 2])
        );
        
        const states = g.append("g")
          .attr("fill", "#4447e9ff")
          .attr("cursor", "pointer")
          .selectAll("path")
          .data(countries.features)
          .join("path")
          .on("click", clicked)
          .attr("d", path);
        
        states.append("title")
          .text(d => d.properties.NAME_FREN); 
        g.append("path")
          .attr("fill", "none")
          .attr("stroke", "white")
          .attr("stroke-linejoin", "round")
          .attr("d", path(topojson.mesh(world, world.objects.CNTR_RG_20M_2024_4326, (a, b) => a !== b)));
          
        svg.append("text")
          .attr("x", width - 10)
          .attr("y", height - 10)
          .attr("text-anchor", "end")
          .style("font-size", "12px")
          .style("fill", "rgba(255, 255, 255, 0.7)")
          .text("Source: FR: © EuroGeographics pour les limites administratives");

        svg.call(zoom);
      
        function reset() {
          states.transition().style("fill", null);
          svg.transition().duration(750).call(
            zoom.transform,
            d3.zoomIdentity,
            d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
          );
        }
      
        function clicked(event, d) {
          const [[x0, y0], [x1, y1]] = path.bounds(d);
          event.stopPropagation();
          states.transition().style("fill", null);
          d3.select(this).transition().style("fill", "red");
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
          const {transform} = event;
          g.attr("transform", transform);
          g.attr("stroke-width", 1 / transform.k);
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