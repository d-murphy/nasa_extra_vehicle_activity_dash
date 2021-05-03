import * as d3 from 'd3'
import { useResizeDetector } from 'react-resize-detector'
import { useEffect, useRef } from 'react'

const AstroCountChart = ({filterMissionData}) => {

    const xAxisRef = useRef(null)
    const yAxisRef = useRef(null)

    let TimelineDotData = filterMissionData

        var rowPerAstroData = [];
        TimelineDotData.forEach(mission => {
          var AstroName = "";
          var CrewMemberId
          var crewMembersToFind = mission.crewArr.length/2
          for(let i=0; i<crewMembersToFind;i++){
            AstroName = mission.crewArr[i*2] + " " + mission.crewArr[i*2+1];
            CrewMemberId = i;
            rowPerAstroData.push({
              ...mission, 
              astroName: AstroName,
              crewMemberId: CrewMemberId
            })  
          }
        })

        var ReducedAstroData = rowPerAstroData
        .reduce((accumulator, astroObs)=>{
          if(!accumulator[astroObs.astroName]){
            accumulator[astroObs.astroName] = {
              astroName: astroObs.astroName,
              astroCountry: astroObs.country,
              numMissions: 1,
              totalMinsInSpace: astroObs.timeInMinutes, 
              yearsActiveMin: astroObs.year,
              yearsActiveMax: astroObs.year
            }
          } else {
            accumulator[astroObs.astroName].numMissions += 1
            accumulator[astroObs.astroName].totalMinsInSpace += astroObs.timeInMinutes
            accumulator[astroObs.astroName].yearsActiveMin = 
              Math.min(accumulator[astroObs.astroName].yearsActiveMin,
                astroObs.year)
            accumulator[astroObs.astroName].yearsActiveMax = 
            Math.max(accumulator[astroObs.astroName].yearsActiveMax,
              astroObs.year)
            }
          return(accumulator)
        },{})

        const AstroCount = Object.values(ReducedAstroData)
        const sortedAstroCount = AstroCount
            .sort((a,b) => (b.numMissions -a.numMissions))
            .slice(0,10)


        console.log("marker", sortedAstroCount)


    const {width: widthRs, ref} = useResizeDetector();

        // consider HEIGHT, even at top of file
    const height = 250
    const margin = {top: 20, right:20, bottom: 20, left: 100}

    const xScale = d3
        .scaleLinear()
        .domain([0, d3.max(sortedAstroCount.map(d=>d.numMissions))])
        .range([0, widthRs-margin.right-margin.left])

     const xAxis = d3.axisBottom().scale(xScale)
    
    const yScale = d3
        .scaleBand()
        .domain(sortedAstroCount.map(d => d.astroName))
        .range([margin.top, height-margin.bottom])
        .paddingInner(0.1)
     const yAxis = d3.axisLeft().scale(yScale)

    useEffect(() => {
        d3.select(xAxisRef.current).call(xAxis) 
        d3.select(yAxisRef.current).call(yAxis)
    },[xAxis,yAxis])

    // useEffect(() =>{
    //      d3.selectAll('circle')
    //         .on('mouseover', function(event) {
    //             var tt1X = event.pageX - 90
    //             var tt1Y = event.pageY - 120
    //             d3.select("#TimelineDotChartMouseover")
    //               .style("left", tt1X + "px")
    //               .style("top", tt1Y + "px")
    //               .html(event.srcElement.attributes.message.nodeValue)
    //               .classed("hidden", false)
    //         })
    //         .on("mouseout", function() {
    //             d3.select("#TimelineDotChartMouseover").classed("hidden", true)
    //         })
    // })



    return(
        <div className="AstroCountChart" ref={ref}>
            <div id="AstroCountChartMouseover" className="hidden"></div>
            <svg viewBox={`0 0 ${widthRs} ${height}`}>

                <g >
                    {sortedAstroCount.map((d,i) => {
                        return(
                            <rect key={i}
                                x={margin.left}
                                y={yScale(d.astroName)}
                                height={yScale.bandwidth()}
                                width={xScale(d.numMissions)}
                                fill= '#5599FF'
                                // message={`<center><b>${d.year}</b></center><br/>
                                //           <b>Mission</b>: ${d.vehicle}<br />
                                //           <b>Personnel</b>: ${d.crewArr.map((name,i) => (i%2===0 || i===d.crewArr.length-1 ? name + " " : name+", ")).join('')}<br />
                                //           ${d.purpose === undefined ? '' : '<b>Description</b>:  '+ d.purpose}`}


                            />
                        )
                    })}
                </g>
                <g>
                    <g ref={xAxisRef} transform={`translate(${margin.left} ${height-margin.bottom})`}/>
                    <g ref={yAxisRef} transform={`translate(${margin.left} 0)`}/>
                    {/* <g>
                        <text transform={`translate(${margin.left+2} ${margin.top}) rotate(90)`}
                         class="yAxisLabel"># of Missions</text>
                    </g> */}
                </g>
            </svg>            
        </div>
    )
    
}
export default AstroCountChart
