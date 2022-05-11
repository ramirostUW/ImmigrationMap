import React, { memo, useState } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import { geoPatterson } from "d3-geo-projection";
import { geoAlbersUk } from "d3-composite-projections";
import ReactTooltip from "react-tooltip";

const geoUrlNI = "https://raw.githubusercontent.com/ramirostUW/ImmigrationMap/main/src/geofiles/northernIreland.json";
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

const projection = geoAlbersUk().translate([1000 / 2, 420 / 2]);/*geoPatterson().scale(1000 / 2.4 * 20 / Math.PI)
.rotate([0,0])
.center([0,52.5])
.translate([1000 / 2, 420 / 2])*/


const MapChartUK = (props) => {
  const [content, setTooltipContent ] = useState("");
  let onClickCountry = function(){

  }

  let listOfCountriesWithData = ["United States of America", "Germany", "United Kingdom", "Canada"]
  //{ setTooltipContent }

  function GeoMappingFunction(props){
    let geo = props.geo;
    const { NAME, POP_EST } = geo.properties;
    let restingColor = "#ffffff";
    if(listOfCountriesWithData.includes(NAME))
      restingColor ="#00FF00";
    let style = {
      default: {
        fill: restingColor,
        stroke: "#d4dbe8",
        outline: "none",
        strokeWidth: "0.75"
      },
      hover: {
        fill: "#ffcf33",
        outline: "none"
      },
      pressed: {
        fill: "#1500d1",
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
          //setTooltipContent(`${NAME} — ${rounded(POP_EST)}`);
        }}
        onMouseEnter={() => {
          const { NAME, POP_EST } = geo.properties;
          //setTooltipContent(`${NAME} — ${rounded(POP_EST)}`);
          setTooltipContent(geo.properties.LAD13NM)
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
      </ComposableMap>
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
};

export default memo(MapChartUK);