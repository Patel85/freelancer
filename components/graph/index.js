export { default as BarGraph } from "./Bars";
export { default as LineGraph } from "./LineGraph";
export { default as ScatterGraph } from "./Scatter";

// import React from 'react'
// import BarGraph from './BarGraph';
// import VerticalBarGraph from './VerticalBarGraph'

// export default function index(props) {

//     switch (props.time) {
//         case "today":
//             return <BarGraph data={props.data} labels={props.labels} duration = {props.time} userId= {props.userId}  />
//             break;
//         case "month" :
//         case "last-month" :
//             return <VerticalBarGraph data={props.data} labels={props.labels} duration = {props.time} userId= {props.userId}  />
//         case "week" :
//         case "last-week" :
//             return <VerticalBarGraph data={props.data} labels={props.labels} duration = {props.time} userId= {props.userId}  />
//         case "year" :
//         case "last-year" :
//             return <VerticalBarGraph data={props.data} labels={props.labels} duration = {props.time} userId= {props.userId}  />
//         default:
//             return <BarGraph data={props.data} labels={props.labels} duration = {props.time} userId= {props.userId} />
//             break;
//     }
// }
