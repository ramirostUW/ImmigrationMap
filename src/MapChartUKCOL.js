import React, { memo, useState } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import { geoPatterson } from "d3-geo-projection";
import { geoAlbersUk } from "d3-composite-projections";
import ReactTooltip from "react-tooltip";
import { getUKcolData } from "./AccessDatabase"
import chroma from "chroma-js";
import { isUndefined } from "lodash";

const geoUrlScotland = "https://raw.githubusercontent.com/ramirostUW/ImmigrationMap/main/src/geofiles/scotland.json";
const geoUrlEngland = "https://raw.githubusercontent.com/ramirostUW/ImmigrationMap/main/src/geofiles/england.json";
const geoUrlWales = "https://raw.githubusercontent.com/ramirostUW/ImmigrationMap/main/src/geofiles/wales.json";

const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

let perc2color = chroma.scale(['yellow', 'red']);

const projection = geoAlbersUk().translate([1000 / 2, 420 / 2]);


const MapChartUK = (props) => {
  const [content, setTooltipContent ] = useState("");
  let onClickCountry = function(){

  }
  const markers = [
    { markerOffset: -15, name: "London", coordinates: [0.1276, 51.5072] }

  ]
  let [colData, colDataLoading] = getUKcolData();
  //{ setTooltipContent }
  let popValues = {}
  if(!colDataLoading){
    for(let i = 0; i < colData.length; i++){
      let currentRow = colData[i];
      popValues[currentRow["city"]] = parseFloat(currentRow["cost of living"]);
    }
  }
  function GeoMappingFunction(props){
    let geo = props.geo;
    let percentOfImmigrants = popValues[geo.properties.LAD13NM? geo.properties.LAD13NM : geo.properties.LGDNAME];
    let style = {
      default: {
        fill: "#ffffff",
        stroke: "#d4dbe8",
        outline: "none",
        strokeWidth: "0.75"
      },
      hover: {
        fill: "#ffffff",
        outline: "none"
      },
      pressed: {
        fill: "#ffffff",
        outline: "none"
      }
    }
    return (
      <Geography
        key={geo.rsmKey}
        geography={geo}
        onClick={() => {
          const { NAME, POP_EST } = geo.properties;
          onClickCountry(NAME, POP_EST);
        }}
        onMouseEnter={() => {
        }}
        onMouseLeave={() => {
          setTooltipContent("");
        }}  
        style={style}
      />
    )
  }
  return (
    <div>
      <ComposableMap data-tip=""
        width={1000}
        height={420}
        style={{ width: "100%", height: "auto" }}
        projection={projection} >
        <Geographies geography={geoUrlEngland}>
          {({ geographies }) =>
            geographies.map(geo =>{return (<GeoMappingFunction geo={geo} />)})
          }
        </Geographies>
        <Geographies geography={geoUrlScotland}>
          {({ geographies }) =>
            geographies.map(geo =>{return (<GeoMappingFunction geo={geo} />)})
          }
        </Geographies>
        <Geographies geography={geoUrlWales}>
          {({ geographies }) =>
            geographies.map(geo =>{return (<GeoMappingFunction geo={geo} />)})
          }
        </Geographies>
        {markers.map(({ name, coordinates, markerOffset }) => (
        <Marker key={name} coordinates={coordinates} 
        onMouseEnter={() => {setTooltipContent(name + " - Cost of Living Index = " + popValues[name])}} 
        onMouseLeave={() => {setTooltipContent("");}} >
          <circle r={5} fill={perc2color(popValues[name]/200)} stroke={"#fff"} strokeWidth={2} />
          <text
            textAnchor="middle"
            y={markerOffset}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
          >
            {name}
          </text>
        </Marker>
      ))}
      </ComposableMap>
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
};

export default memo(MapChartUK);


