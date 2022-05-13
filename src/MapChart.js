import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import { geoPatterson } from "d3-geo-projection";


const geoUrl = //"./world-110m.json"
  //"./datafiles/world-110m.json"
  "https://gist.githubusercontent.com/ramirostUW/9987310d661de632f81589189a257335/raw/ee03f2dcf4fb947683a63480bfd3b2d72d1d2557/gistfile1.txt";

const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + " Million People";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

const projection = geoPatterson()

const MapChart = (props) => {
  let setTooltipContent = props.setTooltipContent
  let onClickCountry = props.onClickCountry;

  let listOfCountriesWithData = ["United States of America", "United Kingdom", "Canada"]
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
              let restingColor = "#E2EDEA";
              if(listOfCountriesWithData.includes(NAME))
                restingColor ="#FFD15A";
              let style = {
                default: {
                  fill: restingColor,
                  stroke: "#005B67",
                  outline: "none",
                  strokeWidth: "0.4"
                },
                hover: {
                  fill: "#005B67",
                  outline: "none"
                },
                pressed: {
                  fill: "#005B67",
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

export default memo(MapChart);