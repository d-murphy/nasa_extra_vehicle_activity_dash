import './App.css'
import {useEffect, useState} from 'react'
import axios from 'axios'

const App = function (){
  const [originalMissionData, setOriginalMissionData] = useState([])

  useEffect(() => {

    // Dates are excluded from the data source.  Launched dates were acquired for missing values
    var dateLUT = {
      "Gemini VIII": "1966-03-16T00:00:00.000",
      "STS-72": "1996-01-11T00:00:00.000",
      "STS-76": "1996-03-22T00:00:00.000",
      "STS-80": "1996-10-31T00:00:00.000",
      "STS-82 /      HST-2": "1997-02-11T00:00:00.000",
      "STS-86": "1997-09-26T00:00:00.000",
      "Soyuz TM-4    Mir": "1987-12-21T00:00:00.000",
      "STS-123/1JA": "2008-03-11T00:00:00.000",
      "STS-130/20A": "2010-02-08T00:00:00.000",
      "Voskhod 2": "1965-03-18T00:00:00.000",
      "Soyuz 4&5": "1969-01-14T00:00:00.000",
      "Soyuz 12": "1973-09-27T00:00:00.000",
      "Soyuz 26    Salyut 6": "1977-12-10T00:00:00.000",
      "Soyuz T-9       Salyut 7": "1983-06-27T00:00:00.000",
      "Soyuz T-13      Salyut 7": "1985-06-06T00:00:00.000",
      "Soyuz TM-7      Mir ": "1988-11-26T00:00:00.000",
      "Soyuz TM-8     Mir ": "1989-09-05T00:00:00.000",
      "Soyuz TM-13     Mir ": "1991-10-02T00:00:00.000",
      "Soyuz TM-15   Mir ": "1992-07-27T00:00:00.000",
      "Soyuz TM-17    Mir 16": "1993-07-01T00:00:00.000",
      "Soyuz TM-18     Mir 17": "1994-01-08T00:00:00.000",
      "Soyuz TM-X     Mir 20": "1995-09-03T00:00:00.000",
      "Soyuz TM-23     Mir 21": "1996-02-21T00:00:00.000",
      "Soyuz TM-24       Mir 22": "1996-08-17T00:00:00.000",
      "ISS Incr-13": "2006-06-01T00:00:00.000",
      "ISS Incr-18": "2008-10-12T00:00:00.000"
    }
  
    axios.get('https://data.nasa.gov/resource/eva.json')
      .then(response => {
        
        setOriginalMissionData(
          response.data.map(mission => {
          var missionMinutes
          if(mission.duration){
            missionMinutes = parseInt(mission.duration.split(':')[0])*60 + parseInt(mission.duration.split(':')[1]) 
          } else {
            missionMinutes = 0
          }

          if(mission.crew === "Leroy Chiao          Winston Scott"){
            mission.vehicle = "STS-72"
          }

          var missionDate = mission.date
          var missionYear = parseInt(new Date(Date.parse(missionDate)).getFullYear())
          if(!missionYear){
            missionDate = dateLUT[mission.vehicle]
            missionYear = parseInt(new Date(Date.parse(missionDate)).getFullYear())
          }
          

          return {...mission,
            crewWithoutSpaces: mission.crew.replace(/\s+/g, ' '),
            crewArr: mission.crew.replace(/\s+/g, ' ').trim().split(' '),
            timeInMinutes: missionMinutes, 
            year: missionYear,
            date: missionDate
          }
        })
      )


        // var rowPerAstroData = [];
        // updatedMissionData.forEach(mission => {
        //   var AstroName = "";
        //   var CrewMemberId
        //   var crewMembersToFind = mission.crewArr.length/2
        //   for(let i=0; i<crewMembersToFind;i++){
        //     AstroName = mission.crewArr[i*2] + " " + mission.crewArr[i*2+1];
        //     CrewMemberId = i;
        //     rowPerAstroData.push({
        //       ...mission, 
        //       astroName: AstroName,
        //       crewMemberId: CrewMemberId
        //     })  
        //   }
        // })

        // var AstroCount = rowPerAstroData
        // .reduce((accumulator, astroObs)=>{
        //   if(!accumulator[astroObs.astroName]){
        //     accumulator[astroObs.astroName] = {
        //       astroName: astroObs.astroName,
        //       astroCountry: astroObs.country,
        //       numMissions: 1,
        //       totalMinsInSpace: astroObs.timeInMinutes, 
        //       yearsActiveMin: astroObs.year,
        //       yearsActiveMax: astroObs.year
        //     }
        //   } else {
        //     accumulator[astroObs.astroName].numMissions += 1
        //     accumulator[astroObs.astroName].totalMinsInSpace += astroObs.timeInMinutes
        //     accumulator[astroObs.astroName].yearsActiveMin = 
        //       Math.min(accumulator[astroObs.astroName].yearsActiveMin,
        //         astroObs.year)
        //     accumulator[astroObs.astroName].yearsActiveMax = 
        //     Math.max(accumulator[astroObs.astroName].yearsActiveMax,
        //       astroObs.year)
        //     }
        //   return(accumulator)
        // },{})

        // console.log(AstroCount)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  //document.getElementById("txt").value.split("\t").length;


  return(
    <div>
      <p>Hello World</p>
      <button onClick={() => console.log(originalMissionData)}>Console log state button</button>
    </div> 
  )
}

export default App