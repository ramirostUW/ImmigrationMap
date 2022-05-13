import React, { memo, useState } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import { geoPatterson } from "d3-geo-projection";
import ReactTooltip from "react-tooltip";
import { getCanadaImmigrantPopulationData } from "./AccessDatabase"
import chroma from "chroma-js";
import { isUndefined } from "lodash";

const geoUrlCanada = "https://raw.githubusercontent.com/ramirostUW/ImmigrationMap/main/src/geofiles/canada.json";

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
var width = 960;
var height = 500;
const projection = geoPatterson().clipAngle(90).rotate([98, -60]).scale(600).translate([500,200])
.scale(700)
.translate([width / 2, height / 2]);/*geoPatterson().scale(1000 / 2.4 * 20 / Math.PI)
.rotate([0,0])
.center([0,52.5])
.translate([1000 / 2, 420 / 2])*/


const MapChartCanada = (props) => {
  const [content, setTooltipContent ] = useState("");
  let onClickCountry = function(){

  }
  let [popData, popDataLoading] = getCanadaImmigrantPopulationData();
  //{ setTooltipContent }
  let popValues = {}
  if(!popDataLoading){
    for(let i = 0; i < popData.length; i++){
      let currentRow = popData[i];
      let nonmigrants = parseInt(currentRow["Period of immigration - Non-immigrants"]);
      let migrants = parseInt(currentRow["Period of immigration - Immigrants"]);
      popValues[currentRow["Geographic name"]] = migrants/(migrants + nonmigrants);
    }
  }
  function GeoMappingFunction(props){
    let geo = props.geo;
    let percentOfImmigrants = popValues[geo.properties.name];
    let style = {
      default: {
        fill: perc2color(percentOfImmigrants * 2),
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
          let name = geo.properties.name
          let percentOfImmigrants = popValues[name];
          //setTooltipContent(`${NAME} — ${rounded(POP_EST)}`);
          setTooltipContent(name + " - " + Math.round((percentOfImmigrants*100)*100)/100 + "% immigrant population")
          //setTooltipContent(name + " - " + percentOfImmigrants + "% immigrant population")
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
      <h2>How many and where are immigrants living?</h2>
      <ComposableMap data-tip=""
        width={1000}
        height={420}
        style={{ width: "100%", height: "auto" }}
        projection={projection} >
        <Geographies geography={geoUrlCanada}>
          {({ geographies }) =>
            geographies.map(geo =>{return (<GeoMappingFunction geo={geo} />)})
          }
        </Geographies>
      </ComposableMap>
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
};

export default memo(MapChartCanada);