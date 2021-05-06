import * as d3 from 'd3'
import { useResizeDetector } from 'react-resize-detector'
import { useEffect, useRef } from 'react'
import {getSpacecraftCounts} from '../Util'
import './SummaryChart.css'

const SpacecraftCountChart = ({filterMissionData}) => {

    const xAxisRef = useRef(null)
    const yAxisRef = useRef(null)

    let SpacecraftCounts = getSpacecraftCounts(filterMissionData)

    SpacecraftCounts = Object.values(SpacecraftCounts)

    SpacecraftCounts = SpacecraftCounts
        .sort((a,b) => (b.spacecraftCount -a.spacecraftCount))

    const {width: widthRs, ref} = useResizeDetector();

    const height = 200
    const margin = {top: 25, right:20, bottom: 30, left: 100}

    const xScale = d3
        .scaleLinear()
        .domain([0, d3.max(SpacecraftCounts.map(d=>d.spacecraftCount))])
        .range([0, widthRs-margin.right-margin.left])
    
    const xAxis = d3.axisBottom()
        .scale(xScale)
        .tickFormat(d3.format("1"))
        .ticks(3);

    const yScale = d3
        .scaleBand()
        .domain(SpacecraftCounts.map(d => d.spacecraft))
        .range([margin.top, height-margin.bottom])
        .paddingInner(0.1)
        .paddingOuter(0.5)
    const yAxis = d3.axisLeft().scale(yScale)

    useEffect(() => {
        d3.select(xAxisRef.current).call(xAxis) 
        d3.select(yAxisRef.current).call(yAxis)
    },[xAxis,yAxis])

    useEffect(() =>{
    
         d3.selectAll('rect')
            .on('mouseover', function(event) {
                var tt1X = event.pageX - 90
                var tt1Y = event.pageY - 100
                d3.select("#SpacecraftCountChartMouseover")
                  .style("left", tt1X + "px")
                  .style("top", tt1Y + "px")
                  .html(event.srcElement.attributes.message.nodeValue)
                  .classed("hidden", false)
            })
            .on("mouseout", function() {
                d3.select("#SpacecraftCountChartMouseover").classed("hidden", true)
            })
    })

    return(
        <div className="SpacecraftCountChart" ref={ref}>
            <div id="SpacecraftCountChartMouseover" className="hidden"></div>
            <svg viewBox={`0 0 ${widthRs} ${height}`}>

                <g >
                    {SpacecraftCounts.map((d,i) => {
                        return(
                            <rect key={i}
                                x={margin.left}
                                y={yScale(d.spacecraft)}
                                height={yScale.bandwidth()}
                                width={xScale(d.spacecraftCount)}
                                fill= {d.country==='USA' ? 'rgba(37, 37, 216, .5)' : 
                                        d.country==='Russia' ? 'rgba(216, 37, 37, .5)' : 'rgba(114, 28, 114, 0.3)'}
                                message={`<center><b>${d.spacecraft}</b><br/><br/>
                                          <b># of Spacewalks</b>: ${d.spacecraftCount}<br />
                                          <b>Spacewalk Years</b>: ${d.spacewalkYearsMax===d.spacewalkYearsMin ? d.spacewalkYearsMin : `${d.spacewalkYearsMin}-${d.spacewalkYearsMax}`}
                                          </center>`}


                            />
                        )
                    })}
                </g>
                <g>
                    <g ref={xAxisRef} transform={`translate(${margin.left} ${height-margin.bottom})`}/>
                    <g ref={yAxisRef} transform={`translate(${margin.left} 0)`}/>
                    <g>
                        <text transform={`translate(${widthRs-widthRs*.5} ${height}) `}
                         className="yAxisLabel"># of Missions</text>
                    </g>
                    <g>
                        <text transform={`translate(${widthRs-widthRs*.7} ${margin.top-8}) `}
                         className="title">Spacecraft Spacewalk Count</text>
                    </g>
                </g>
            </svg>            
        </div>
    )
    
}
export default SpacecraftCountChart
