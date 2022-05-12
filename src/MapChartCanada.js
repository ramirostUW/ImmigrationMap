import React, { memo, useState } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import { geoPatterson } from "d3-geo-projection";
import ReactTooltip from "react-tooltip";
import { getImmigrantPopulationDataUK } from "./AccessDatabase"
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
  let [popData, popDataLoading] = getImmigrantPopulationDataUK();
  //{ setTooltipContent }
  let popValues = {}
  if(!popDataLoading){
    for(let i = 0; i < popData.length; i++){
      let currentRow = popData[i];
      popValues[currentRow["AREANM"]] = parseInt(currentRow["% Non-UK born, 2020"]);
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
          let name = geo.properties.LAD13NM
          if(!name){
            name = geo.properties.LGDNAME
          }
          let percentOfImmigrants = popValues[name];
          //setTooltipContent(`${NAME} — ${rounded(POP_EST)}`);
          setTooltipContent(geo.properties.name)
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