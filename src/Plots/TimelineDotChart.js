import * as d3 from 'd3'
import './TimelineDotChart.css'
import { useResizeDetector } from 'react-resize-detector'

const TimelineDotChart = ({filterMissionData}) => {

    let TimelineDotData = filterMissionData
    let year = 0; // a year before the dataset
    let yearCounter = 1;
    for(let i=0;i<TimelineDotData.length;i++){
        if(TimelineDotData[i].year !== year){
            year = TimelineDotData[i].year
            yearCounter = 1
        } else {
            yearCounter += 1
        }
    TimelineDotData[i].yearRank = yearCounter
    }

    const {width: widthRs, height: heightRs,ref} = useResizeDetector();

    const height = 400 
    const margin = {top: 30, right:40, bottom: 30, left: 30}
    const maxNumInYear = 25  // fixing these for domain instead of re-scaling after each filter
    const minYear = 1965
    const maxYear = 2013
    const xScale = d3
        .scaleLinear()
        .domain([minYear, maxYear])
        // .domain([d3.min(TimelineDotData, d=>d.year),
        //          d3.max(TimelineDotData, d=>d.year)])
        .range([margin.left, widthRs-margin.right])
    const yScale = d3
        .scaleLinear()
        .domain([0,maxNumInYear])
//        .domain([0,d3.max(TimelineDotData, d=>d.yearRank)])
        .range([height-margin.bottom, margin.top])

    return(
        <div className="TimelineDotChart" ref={ref}>
            <svg viewBox={`0 0 ${widthRs} ${height}`}>
                <g >
                    {TimelineDotData.map((d,i) => {
                        return(
                            <circle key={i}
                                cx={xScale(d.year)}
                                cy={yScale(d.yearRank)}
                                r={(xScale(1966)-xScale(1965))/2}
                                fill={d.country==='USA' ? '#5599FF' : '#FF9955'}
                            />
                        )
                    })}
                </g>
            </svg>            
        </div>
    )
    
}
export default TimelineDotChart
