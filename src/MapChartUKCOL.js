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
    { markerOffset: -15, name: "London", coordinates: [-0.1276, 51.5072] },
    { markerOffset: -15, name: "Milton Keynes", coordinates: [-0.7594, 52.0406] },
    { markerOffset: -15, name: "Bath", coordinates: [-2.3597, 51.3781] },
    { markerOffset: -15, name: "Reading", coordinates: [-0.9787, 51.4551] },
    { markerOffset: -15, name: "Aberdeen", coordinates: [-2.0938, 57.1499] },
    { markerOffset: -15, name: "Cambridge", coordinates: [-0.1313, 52.1951] },
    { markerOffset: -15, name: "Oxford", coordinates: [-1.2577, 51.7520] },
    { markerOffset: -15, name: "Portsmouth", coordinates: [-1.0880, 50.8198] },
    { markerOffset: -15, name: "Edinburgh", coordinates: [-3.1883, 55.9533] },
    { markerOffset: -15, name: "York", coordinates: [-1.0739, 53.9614] },
    { markerOffset: -15, name: "Manchester", coordinates: [-2.2426, 53.4808] },
    { markerOffset: -15, name: "Bristol", coordinates: [-2.5879, 51.4545] },
    { markerOffset: 15, name: "Brighton", coordinates: [-0.1363, 50.8229] },
    { markerOffset: -15, name: "Coventry", coordinates: [-1.5090, 52.4128] },
    { markerOffset: -15, name: "Leeds", coordinates: [-1.5491, 53.8008] },
    { markerOffset: -15, name: "Norwich", coordinates: [-1.2979, 52.6293] },
    { markerOffset: 15, name: "Glasgow", coordinates: [-4.2518, 55.8642] },
    { markerOffset: -15, name: "Nottingham", coordinates: [-1.1550, 52.9540] },
    { markerOffset: -15, name: "Leicester", coordinates: [-1.1398, 52.6369] },
    { markerOffset: 15, name: "Exeter", coordinates: [-3.5275, 50.7260] },
    { markerOffset: -15, name: "Birmingham", coordinates: [-1.8904, 52.4862] },
    { markerOffset: -15, name: "Southampton", coordinates: [-1.4049, 50.9105] },
    { markerOffset: -15, name: "Sheffield", coordinates: [-1.4701, 53.3811] },
    { markerOffset: -15, name: "Liverpool", coordinates: [-2.9916, 53.4084] },
    { markerOffset: -15, name: "Cardiff", coordinates: [-3.1681, 51.4837] },
    { markerOffset: -5, name: "Newcastle", coordinates: [-1.6178, 54.9783] },
    { markerOffset: -15, name: "Belfast", coordinates: [-5.9301, 54.5973] },
    { markerOffset: -15, name: "Derby", coordinates: [-1.4746, 52.9225] }
    /*
    ,
 
    */

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


