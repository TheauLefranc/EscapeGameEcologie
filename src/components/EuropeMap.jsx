import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

// Coordonnées manuelles pour recentrer certains pays (Longitude, Latitude)
const CUSTOM_CENTROIDS = {
  "FR": [2.5, 46.5],
  "NO": [9.0, 61.0],
  "PT": [-8.0, 39.5],
  "ES": [-3.5, 40.0]
};

// eslint-disable-next-line react/prop-types
export default function EuropeMap({ data, maxVal }) {
  const ref = useRef();
  const [geoData, setGeoData] = useState(null);
  
  // Refs pour D3
  const svgRef = useRef(null);
  const gRef = useRef(null);
  const circlesGroupRef = useRef(null);
  
  // REF POUR LES DONNÉES : Permet aux fonctions 'reset' et 'clicked' d'accéder 
  // aux données à jour sans être recréées à chaque changement.
  const dataRef = useRef(data);
  dataRef.current = data; // Mise à jour permanente de la ref

  // 1. Initialisation (Montage unique)
  useEffect(() => {
    let isMounted = true;
    const initMap = async () => {
      try {
        const world = await d3.json("/data/Pays.json");
        if (!isMounted) return;

        const countries = topojson.feature(world, world.objects.CNTR_RG_20M_2024_4326);
        setGeoData(countries);

      } catch (error) {
        console.error("Erreur chargement carte:", error);
      }
    };
    initMap();
    return () => { isMounted = false; };
  }, []);

  // 2. Rendu et Mise à jour
  useEffect(() => {
    if (!geoData) return;

    const width = 1200;
    const height = 600;

    // --- A. Configuration du SVG (si inexistant) ---
    if (!svgRef.current) {
      const projection = d3.geoMercator()
        .center([13, 54])
        .scale(500)
        .translate([width / 2, height / 2]);

      const path = d3.geoPath().projection(projection);

      // Création du SVG avec fond BLANC
      const svg = d3.select(ref.current)
        .append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width)
        .attr("height", height)
        .attr("style", "max-width: 100%; height: auto; background: #ffffff;") 
        .on("click", reset);

      const g = svg.append("g");
      svgRef.current = svg;
      gRef.current = g;

      const zoom = d3.zoom()
        .scaleExtent([1, 8])
        .on("zoom", (event) => {
          g.attr("transform", event.transform);
          g.selectAll("path").attr("stroke-width", 0.5 / event.transform.k);
          g.selectAll("circle.data-circle").attr("stroke-width", 1 / event.transform.k);
        });
      svg.call(zoom);

      // Dessin des pays
      g.append("g")
        .selectAll("path")
        .data(geoData.features)
        .join("path")
        .attr("class", "country")
        .attr("fill", "#e0e0e0") 
        .attr("stroke", "#ffffff") 
        .attr("stroke-width", 0.5)
        .attr("cursor", "pointer")
        .attr("d", path)
        .on("click", clicked);

      circlesGroupRef.current = g.append("g");

      // --- LÉGENDE ET SOURCES ---
      const legend = svg.append("g")
        .attr("transform", `translate(20, ${height - 150})`)
        .attr("class", "legend");

      legend.append("rect")
        .attr("width", 220)
        .attr("height", 140)
        .attr("fill", "rgba(255, 255, 255, 0.8)")
        .attr("rx", 5);

      legend.append("text")
        .attr("x", 10)
        .attr("y", 20)
        .text("Légende")
        .attr("font-weight", "bold")
        .attr("font-family", "Roboto, sans-serif")
        .attr("fill", "#333");

      legend.append("rect")
        .attr("x", 10)
        .attr("y", 35)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", "#4447e9");
      
      legend.append("text")
        .attr("x", 35)
        .attr("y", 47)
        .text("Pays participants (UE ETS)")
        .attr("font-size", "12px")
        .attr("font-family", "Roboto, sans-serif")
        .attr("fill", "#333");
      
      legend.append("circle")
        .attr("cx", 17)
        .attr("cy", 75)
        .attr("r", 8)
        .attr("fill", "#ffcc00")
        .attr("fill-opacity", 0.7)
        .attr("stroke", "#333");

      legend.append("text")
        .attr("x", 35)
        .attr("y", 80)
        .text("Émissions vérifiées (CO₂)")
        .attr("font-size", "12px")
        .attr("font-family", "Roboto, sans-serif")
        .attr("fill", "#333");

      svg.append("text")
        .attr("x", width - 10)
        .attr("y", height - 10)
        .attr("text-anchor", "end")
        .text("Sources : AEE (EEA Europa) et © EuroGeographics pour les limites administratives")
        .attr("font-size", "10px")
        .attr("fill", "#666")
        .attr("font-family", "Roboto, sans-serif");


      // --- FONCTIONS INTERNES (Reset & Click) ---
      
      // Helper pour récupérer la couleur sans dépendre de la closure 'data'
      // On utilise dataRef.current pour avoir les données "fraîches"
      function getCountryColor(properties) {
        const currentData = dataRef.current; 
        const name = properties.NAME_ENGL;
        if (currentData && currentData[name] !== undefined) {
            return "#4447e9"; 
        }
        return "#e0e0e0";
      }

      function reset() {
        // Au reset, on recolorie avec les données ACTUELLES (via ref)
        g.selectAll("path.country")
          .transition().duration(200)
          .attr("fill", d => getCountryColor(d.properties));

        svg.transition().duration(750).call(
          zoom.transform,
          d3.zoomIdentity,
          d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
        );
      }

      function clicked(event, d) {
        const feature = d.feature ? d.feature : d;
        const [[x0, y0], [x1, y1]] = path.bounds(feature);
        event.stopPropagation();
        
        // Au clic, on reset d'abord toutes les couleurs avec les données ACTUELLES
        g.selectAll("path.country")
          .transition().duration(200)
          .attr("fill", d => getCountryColor(d.properties));
        
        // Puis on met en surbrillance l'élément cliqué
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
    }

    // --- B. Mise à jour des Données (boucle réactive normale) ---
    if (circlesGroupRef.current && data) {
      const projection = d3.geoMercator()
        .center([13, 54])
        .scale(500)
        .translate([width / 2, height / 2]);
      
      const path = d3.geoPath().projection(projection);

      const radiusScale = d3.scaleSqrt()
        .domain([0, maxVal || 100000000]) 
        .range([0, 120]);

      // Mise à jour des couleurs des pays (lorsque le slider change)
      const g = gRef.current;
      g.selectAll("path.country")
        .transition().duration(200)
        .attr("fill", d => {
            const name = d.properties.NAME_ENGL;
            if (data[name] !== undefined) return "#4447e9";
            return "#e0e0e0";
        });

      // Tooltips Pays
      g.selectAll("path.country").select("title").remove();
      g.selectAll("path.country")
        .each(function(d) {
           const name = d.properties.NAME_ENGL;
           const val = data[name];
           d3.select(this).append("title")
             .text(`${name}\nÉmissions: ${val ? Math.round(val).toLocaleString() : 'Pas de données'} tCO2eq`);
        });

      // Cercles
      const featuresWithData = geoData.features
        .map(feature => {
          const nameEngl = feature.properties.NAME_ENGL;
          const value = data[nameEngl];
          const isoCode = feature.properties.CNTR_ID || feature.properties.ISO_A2; 
          return { feature, value, name: nameEngl, isoCode };
        })
        .filter(item => item.value !== undefined && item.value > 0);

      circlesGroupRef.current
        .selectAll("circle.data-circle")
        .data(featuresWithData, d => d.name)
        .join(
          enter => enter.append("circle")
            .attr("class", "data-circle")
            .attr("transform", d => {
              if (CUSTOM_CENTROIDS[d.isoCode]) {
                const [lon, lat] = CUSTOM_CENTROIDS[d.isoCode];
                const coords = projection([lon, lat]);
                return `translate(${coords[0]}, ${coords[1]})`;
              }
              return `translate(${path.centroid(d.feature)})`;
            })
            .attr("r", 0)
            .attr("fill", "#ffcc00")
            .attr("fill-opacity", 0.7)
            .attr("stroke", "#333")
            .attr("stroke-width", 1)
            .attr("cursor", "pointer")
            .call(enter => enter.transition().duration(500).attr("r", d => radiusScale(d.value))),
          update => update
            .call(update => update.transition().duration(500).attr("r", d => radiusScale(d.value))),
          exit => exit
            .call(exit => exit.transition().duration(500).attr("r", 0).remove())
        );

      circlesGroupRef.current.selectAll("circle.data-circle").select("title").remove();
      circlesGroupRef.current.selectAll("circle.data-circle")
        .append("title")
        .text(d => `${d.name}\nÉmissions: ${Math.round(d.value).toLocaleString()} tCO2eq`);
    }

  }, [geoData, data, maxVal]);

  return (
    <div className="w-full p-4">
      <div ref={ref} className="w-full flex justify-center" />
    </div>
  );
}