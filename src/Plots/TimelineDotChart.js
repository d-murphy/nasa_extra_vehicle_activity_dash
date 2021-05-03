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

    const xAxis = d3.axisBottom().scale(xScale)
    
    const yScale = d3
        .scaleLinear()
        .domain([0,maxNumInYear])
//        .domain([0,d3.max(TimelineDotData, d=>d.yearRank)])
        .range([height-margin.bottom, margin.top])

    const yAxis = d3.axisLeft().scale(yScale)

    useEffect(() =>{
        d3.select(xAxisRef.current).call(xAxis) //.call(xAxis)
        
        d3.selectAll('circle')
            // .on('mouseover', function(event, d) {
            //     console.log(event.srcElement.attributes.message.nodeValue)
            // })
            .on('mouseover', function(event, d) {
                var tt1X = 200  
                var tt1Y = 200 
                d3.select("#testMouseover")
                  .style("left", tt1X + "px")
                  .style("top", tt1Y + "px")
                  .html(event.srcElement.attributes.message.nodeValue)
                  .classed("hidden", false)
            })
            .on("mouseout", function() {
                d3.select("#testMouseover").classed("hidden", true)
            })


      //  console.log( d3.select(xAxisRef) )
        //console.log(xAxis)
    })



    return(
        <div className="TimelineDotChart" ref={ref}>
            <div id="testMouseover">starter text</div>
            <svg viewBox={`0 0 ${widthRs} ${height}`}>

                <g >
                    {TimelineDotData.map((d,i) => {
                        return(
                            <circle key={i}
                                cx={xScale(d.year)}
                                cy={yScale(d.yearRank)}
                                r={(xScale(1966)-xScale(1965))/2}
                                fill={d.country==='USA' ? '#5599FF' : '#FF9955'}
                                message={`<p>Check divs you did in other project, maybe use the same ${d.year}</p><p>${d.country}</p>`}
                            />
                        )
                    })}
                </g>
                <g>
                    <g ref={xAxisRef} />
                    <g ref={yAxisRef} />
                </g>
            </svg>            
        </div>
    )
    
}
export default TimelineDotChart
