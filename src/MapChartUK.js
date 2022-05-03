import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import { geoPatterson } from "d3-geo-projection";


const geoUrl = "https://raw.githubusercontent.com/ramirostUW/ImmigrationMap/main/src/geofiles/uk.json";

const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

let width =1000;
let height = 420;
const projection = geoPatterson().scale(width / 2.4 * 20 / Math.PI)
.rotate([0,0])
.center([0,52.5])
.translate([width / 2, height / 2])


const MapChartUK = (props) => {
  let setTooltipContent = function(){

  }
  let onClickCountry = function(){

  }

  let listOfCountriesWithData = ["United States of America", "Germany", "United Kingdom", "Canada"]
  //{ setTooltipContent }
  return (
    <>
      <ComposableMap data-tip=""
        width={1000}
        height={420}
        style={{ width: "100%", height: "auto" }}
        projection={projection} >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              
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
                    setTooltipContent(`${NAME} — ${rounded(POP_EST)}`);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={style}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
    </>
  );
};

export default memo(MapChartUK);