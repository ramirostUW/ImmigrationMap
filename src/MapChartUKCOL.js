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
const geoUrlNI = "https://raw.githubusercontent.com/ramirostUW/ImmigrationMap/main/src/geofiles/northernIreland.json";

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
    { xmarkerOffset : 10, markerOffset: -5, name: "London", coordinates: [-0.1276, 51.5072] },
    { xmarkerOffset : 25, markerOffset: 10, name: "Milton Keynes", coordinates: [-0.7594, 52.0406] },
    { xmarkerOffset : 0, markerOffset: 10, name: "Bath", coordinates: [-2.3597, 51.3781] },
    { xmarkerOffset : -10, markerOffset: 13, name: "Reading", coordinates: [-0.9787, 51.4551] },
    { xmarkerOffset : 0, markerOffset: -15, name: "Aberdeen", coordinates: [-2.0938, 57.1499] },
    { xmarkerOffset : 10, markerOffset: -5, name: "Cambridge", coordinates: [-0.1313, 52.1951] },
    { xmarkerOffset : -13, markerOffset: -5, name: "Oxford", coordinates: [-1.2577, 51.7520] },
    { xmarkerOffset : 0, markerOffset: 15, name: "Portsmouth", coordinates: [-1.0880, 50.8198] },
    { xmarkerOffset : 0, markerOffset: -10, name: "Edinburgh", coordinates: [-3.1883, 55.9533] },
    { xmarkerOffset : 15, markerOffset: 0, name: "York", coordinates: [-1.0739, 53.9614] },
    { xmarkerOffset : -15, markerOffset: -8, name: "Manchester", coordinates: [-2.2426, 53.4808] },
    { xmarkerOffset : 5, markerOffset: -5, name: "Bristol", coordinates: [-2.5879, 51.4545] },
    { xmarkerOffset : 20, markerOffset: -5, name: "Brighton", coordinates: [-0.1363, 50.8229] },
    { xmarkerOffset : 0, markerOffset: 10, name: "Coventry", coordinates: [-1.5090, 52.4128] },
    { xmarkerOffset : -10, markerOffset: -5, name: "Leeds", coordinates: [-1.5491, 53.8008] },
    { xmarkerOffset : -23, markerOffset: 0, name: "Norwich", coordinates: [-1.2979, 52.6293] },
    { xmarkerOffset : -15, markerOffset: 15, name: "Glasgow", coordinates: [-4.2518, 55.8642] },
    { xmarkerOffset : 30, markerOffset: 0, name: "Nottingham", coordinates: [-1.1550, 52.9540] },
    { xmarkerOffset : 23, markerOffset: 0, name: "Leicester", coordinates: [-1.1398, 52.6369] },
    { xmarkerOffset : -10, markerOffset: 15, name: "Exeter", coordinates: [-3.5275, 50.7260] },
    { xmarkerOffset : -29, markerOffset: 0, name: "Birmingham", coordinates: [-1.8904, 52.4862] },
    { xmarkerOffset : -33, markerOffset: 0, name: "Southampton", coordinates: [-1.4049, 50.9105] },
    { xmarkerOffset : 20, markerOffset: 0, name: "Sheffield", coordinates: [-1.4701, 53.3811] },
    { xmarkerOffset : -15, markerOffset: -3, name: "Liverpool", coordinates: [-2.9916, 53.4084] },
    { xmarkerOffset : -10, markerOffset: -5, name: "Cardiff", coordinates: [-3.1681, 51.4837] },
    { xmarkerOffset : 0, markerOffset: -5, name: "Newcastle", coordinates: [-1.6178, 54.9783] },
    { xmarkerOffset : 0, markerOffset: -10, name: "Belfast", coordinates: [-5.9301, 54.5973] },
    { xmarkerOffset : -15, markerOffset: 0, name: "Derby", coordinates: [-1.4746, 52.9225] }
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
        <Geographies geography={geoUrlNI}>
          {({ geographies }) =>
            geographies.map(geo =>{return (<GeoMappingFunction geo={geo} />)})
          }
        </Geographies>
        {markers.map(({ name, coordinates, markerOffset, xmarkerOffset }) => (
        <Marker key={name} coordinates={coordinates} 
        onMouseEnter={() => {setTooltipContent(name + " - Cost of Living Index = " + popValues[name])}} 
        onMouseLeave={() => {setTooltipContent("");}} >
          <circle r={5} fill={perc2color(popValues[name]/200)} stroke={"#fff"} strokeWidth={2} />
          <text
            textAnchor="middle"
            y={markerOffset}
            x={0 + xmarkerOffset}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize:"10px"}}
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


