/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import Map from '/home/balu/covid-19/src/client/console/IndiaMap/Map.js'
function IndiaMap() {
    const [tooltipContent, setTooltipContent] = useState('');

    const onMouseEnter = (geo, current = { value: 'NA' }) => {
        return () => {
            setTooltipContent(`${geo.properties.name}: ${current.value}`);
        };
    };
    const onMouseLeave = () => {
        setTooltipContent('');
    };
    return (
        <div>
            <Map />
            <ReactTooltip>{tooltipContent}</ReactTooltip>
        </div>
    )
}
export default IndiaMap