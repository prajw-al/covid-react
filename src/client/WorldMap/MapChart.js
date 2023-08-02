/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Sphere,
    Graticule
} from "react-simple-maps";
// import axios from 'axios';
const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
const MapChart = (setTooltipContent) => {
    // const [data, setData] = useState([]);

    // useEffect(async () => {
    //     const result = await axios(
    //         'https://corona.lmao.ninja/v2/countries',
    //     );
    //     setData(result.data);
    // }, []);
    // console.log(data)
    return (
        <ComposableMap className="WorldMap"
            projectionConfig={{
                rotate: [-10, 0, 0],
                scale: 200
            }} >
            <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
            <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
            <Geographies geography={geoUrl}>
                {({ geographies }) =>
                    geographies.map(geo => {
                        // const d = data.find(s => d.countryInfo.ISO3 === geo.properties.ISO_A3);
                        return (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                onMouseEnter={() => {
                                    // data.find(s)
                                    // setTooltipContent(`${d.country} — ${d.cases}`);
                                }}
                                onMouseLeave={() => {
                                    setTooltipContent("");
                                }}
                                style={{
                                    default: {
                                        fill: "black",
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
                        );
                    })
                }
            </Geographies>
        </ComposableMap>
    );
};


export default MapChart;











































// import React, { memo } from "react";
// import {
//     ComposableMap,
//     Geographies,
//     Geography
// } from "react-simple-maps";

// const geoUrl =
//     "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

// const rounded = num => {
//     if (num > 1000000000) {
//         return Math.round(num / 100000000) / 10 + "Bn";
//     } else if (num > 1000000) {
//         return Math.round(num / 100000) / 10 + "M";
//     } else {
//         return Math.round(num / 100) / 10 + "K";
//     }
// };

// const MapChart = ({ setTooltipContent }) => {
//     return (
//         <div className="worldMap">
//             <ComposableMap style={{ width: '100%', height: '45%', margin: 'none' }} data-tip="" projectionConfig={{ scale: 200 }}>
//                 <Geographies geography={geoUrl}>
//                     {({ geographies }) =>
//                         geographies.map(geo => (
//                             <Geography
//                                 key={geo.rsmKey}
//                                 geography={geo}
//                                 onMouseEnter={() => {
//                                     const { NAME, POP_EST } = geo.properties;
//                                     setTooltipContent(`${ NAME } — ${ rounded(POP_EST) }`);
//                                 }}
//                                 onMouseLeave={() => {
//                                     setTooltipContent("");
//                                 }}
//                                 style={{
//                                     default: {
//                                         fill: "black",
//                                         outline: "none"
//                                     },
//                                     hover: {
//                                         fill: "#F53",
//                                         outline: "none"
//                                     },
//                                     pressed: {
//                                         fill: "#E42",
//                                         outline: "none"
//                                     }
//                                 }}
//                             />
//                         ))
//                     }
//                 </Geographies>
//             </ComposableMap>
//         </div>
//     );
// };

// export default memo(MapChart);
