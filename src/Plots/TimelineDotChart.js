import * as d3 from 'd3'
import './TimelineDotChart.css'
import { useResizeDetector } from 'react-resize-detector'
import { useEffect, useRef } from 'react'

const TimelineDotChart = ({filterMissionData}) => {

    const xAxisRef = useRef(null)
    const yAxisRef = useRef(null)

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

    const {width: widthRs, ref} = useResizeDetector();

    const height = 400 
    const margin = {top: 30, right:40, bottom: 30, left: 30}
    const maxNumInYear = 25  // fixing these for domain instead of re-scaling after each filter
    const minYear = 1965
    const maxYear = 2013
    const xScale = d3
        .scaleLinear()
        .domain([minYear-1, maxYear])
        .range([margin.left, widthRs-margin.right])

    const xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format("d"));
    
    const yScale = d3
        .scaleLinear()
        .domain([0,maxNumInYear])
        .range([height-margin.bottom, margin.top])

    const yAxis = d3.axisLeft().scale(yScale)

    useEffect(() => {
        d3.select(xAxisRef.current).call(xAxis) 
        d3.select(yAxisRef.current).call(yAxis)
    },[xAxis,yAxis])

    useEffect(() =>{
         d3.selectAll('circle')
            .on('mouseover', function(event) {
                var tt1X = event.pageX - 90
                var tt1Y = event.pageY - 120
                d3.select("#TimelineDotChartMouseover")
                  .style("left", tt1X + "px")
                  .style("top", tt1Y + "px")
                  .html(event.srcElement.attributes.message.nodeValue)
                  .classed("hidden", false)
            })
            .on("mouseout", function() {
                d3.select("#TimelineDotChartMouseover").classed("hidden", true)
            })
    })



    return(
        <div className="TimelineDotChart" ref={ref}>
            <div id="TimelineDotChartMouseover" className="hidden"></div>
            <svg viewBox={`0 0 ${widthRs} ${height}`}>

                <g >
                    {TimelineDotData.map((d,i) => {
                        return(
                            <circle key={i}
                                cx={xScale(d.year)}
                                cy={yScale(d.yearRank)}
                                r={(xScale(1966)-xScale(1965))/2}
                                fill={d.country==='USA' ? '#5599FF' : '#FF9955'}
                                message={`<center><b>${d.year}</b></center><br/>
                                          <b>Mission</b>: ${d.vehicle}<br />
                                          <b>Personnel</b>: ${d.crewArr.map((name,i) => (i%2===0 || i===d.crewArr.length-1 ? name + " " : name+", ")).join('')}<br />
                                          ${d.purpose === undefined ? '' : '<b>Description</b>:  '+ d.purpose}`}


                            />
                        )
                    })}
                </g>
                <g>
                    <g ref={xAxisRef} transform={`translate(0 ${height-margin.bottom})`}/>
                    <g ref={yAxisRef} transform={`translate(${margin.left} 0)`}/>
                    <g>
                        <text transform={`translate(${margin.left+2} ${margin.top}) rotate(90)`}
                         class="yAxisLabel"># of Missions</text>
                    </g>
                </g>
            </svg>            
        </div>
    )
    
}
export default TimelineDotChart
