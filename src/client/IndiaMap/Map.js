/* eslint-disable no-lone-blocks */
import {
    ComposableMap, Geographies, Geography
} from 'react-simple-maps';
import React from 'react';
const INDIA_TOPO_JSON = require('./india.topo.json');

function Map() {
    console.log(INDIA_TOPO_JSON)
    return (
        <ComposableMap className="WorldMap"
            projectionConfig={{
                scale: 350,
                center: [78.9629, 22.5937]
            }}
            width={600}
            height={220} >
            <Geographies geography={INDIA_TOPO_JSON}>
                {({ geographies }) =>
                    geographies.map(geo => {
                        // const d = data.find(s => d.countryInfo.ISO3 === geo.properties.ISO_A3);
                        return (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}

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
    )
}
export default Map




{/* <ComposableMap
                projectionConfig={PROJECTION_CONFIG}
                projection="geoMercator"
                width={600}
                height={220}
                data-tip=""
            >
                <Geographies geography={INDIA_TOPO_JSON}>
                    {({ geographies }) =>
                        geographies.map(geo => {
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap> */}