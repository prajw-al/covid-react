import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import MapChart from "./MapChart";

function WorldMap(props) {
    const [content, setContent] = useState("");
    return (
        <div className="worldMap">
            <MapChart
                setTooltipContent={setContent}
                areas={props} />
            <ReactTooltip>{content}</ReactTooltip>
        </div>
    );
}
export default WorldMap
/////////////
// import React, { Component } from 'react';
// import { MainViewHeader } from './MainViewHeader';

// google.charts.load('current', { 'packages': ['corechart'] });

// class WorldMap extends Component {
//     constructor() {
//         super();
//         this.state = {
//             touristInfos: [],
//             touristInfosHeader: []
//         };
//         // google.charts.setOnLoadCallback(() => this.renderGoogleTable());
//         this.renderGoogleTable = this.renderGoogleTable.bind(this)
//     }
//     componentDidUpdate() {
//         this.renderGoogleTable();
//     }

//     renderGoogleTable() {
//         let data = google.visualization.arrayToDataTable(this.state.touristInfos);

//         let table = new google.visualization.Table(document.getElementById('table_div'));
//         table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
//     }

//     render() {
//         return (
//             <div className="search-and-overview">
//                 <MainViewHeader />
//                 <div className="mid-region">
//                     <div className="content">
//                         <div className="problem-list">
//                             <div id="table_div"></div>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         );
//     }
// }
// export default WorldMap

























// import React, { useState } from "react";
// import ReactTooltip from "react-tooltip";
// import MapChart from "/home/balu/health-data/src/client/WorldMap/MapChart.js";
// function WorldMap(areas) {
//     const [content, setContent] = useState("");
//     return (
//         < div >
//             <MapChart setTooltipContent={setContent}
//                 areas={areas} />
//             <ReactTooltip>{content}</ReactTooltip>
//         </div >
//     );
// }
// export default WorldMap;

// import React from 'react';

// import VectorMap, {
//     Layer,
//     Tooltip,
//     Border,
//     Font
// } from 'devextreme-react/vector-map';

// import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js';
// import { countries } from './data.js';

// const bounds = [-180, 85, 180, -60];

// export default function WorldMap() {
//     return (
//         <VectorMap
//             className="worldMap"
//             id="vector-map"
//             bounds={bounds}
//             onClick={clickHandler}
//         >
//             <Layer
//                 dataSource={mapsData.world}
//                 customize={customizeLayer}>
//             </Layer>
//             <Tooltip enabled={true}
//                 customizeTooltip={customizeTooltip}
//             >
//                 <Border visible={true}></Border>
//                 <Font color="black"></Font>
//             </Tooltip>
//         </VectorMap>
//     );
// }

// function customizeTooltip(arg) {
//     const name = arg.attribute('Name');
//     const country = countries[name];
//     if (country) {
//         return {
//             text: `${name}: ${country.cases}`,
//         };
//     }
// }

// function clickHandler({ target }) {
//     if (target && countries[target.attribute('Name')]) {
//         target.selected(!target.selected());
//     }
// }

// function customizeLayer(elements) {
//     elements.forEach((element) => {
//         const country = countries[element.attribute('Name')];
//         if (country) {
//             element.applySettings({
//                 color: 'black',
//                 hoveredColor: '#e0e000',
//                 selectedColor: '#008f00'
//             });
//         }
//     });
// }
