import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

const geoUrl = //"./world-110m.json"
//"./datafiles/world-110m.json"
  "https://gist.githubusercontent.com/ramirostUW/9987310d661de632f81589189a257335/raw/ee03f2dcf4fb947683a63480bfd3b2d72d1d2557/gistfile1.txt";

const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

const MapChart = (props) => {
  let setTooltipContent = props.setTooltipContent
  let onClickCountry = props.onClickCountry;
  //{ setTooltipContent }
  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => (
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
                style={{
                  default: {
                    fill: "#D6D6DA",
                    outline: "none"
                  },
                  hover: {
                    fill: "#F53",
                    outline: "none"
                  },
                  pressed: {
                    fill: "#E42",
                    outline: "none"
                  }
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);