import './App.css'
import {useEffect, useState} from 'react'
import axios from 'axios'
import FilterContainer from './FilterContainer.js'
import PlotsContainer from './PlotsContainer.js'

const App = function (){
  const [originalMissionData, setOriginalMissionData] = useState([])
  const [filterMissionData, setFilterMissionData] = useState([])

  useEffect(() => {

    // Dates are excluded from the data source.  Launched dates were acquired for missing values
    const dateLUT = {
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
          let missionMinutes
          if(mission.duration){
            missionMinutes = parseInt(mission.duration.split(':')[0])*60 + parseInt(mission.duration.split(':')[1]) 
          } else {
            missionMinutes = 0
          }

          if(mission.crew === "Leroy Chiao          Winston Scott"){
            mission.vehicle = "STS-72"
          }

          let missionDate = mission.date
          let missionYear = parseInt(new Date(Date.parse(missionDate)).getFullYear())
          if(!missionYear){
            missionDate = dateLUT[mission.vehicle]
            missionYear = parseInt(new Date(Date.parse(missionDate)).getFullYear())
          }

          let purpose = mission.purpose ? mission.purpose.replaceAll("Â","'") : ''

          let spacecraft = mission.vehicle.split(/[\s-]+/)[0]
          spacecraft = spacecraft === 'Incr' ? 'ISS' : spacecraft

          let cosmoOrAstro = mission.country==="USA" ? 'Astronaut' : 'Cosmonaut'
          
          let crewWithoutSpaces = mission.crew.replace(/\s+/g, ' ')

          return {...mission,
            crewWithoutSpaces: crewWithoutSpaces,
            crewArr:  crewWithoutSpaces.trim().split(' '),
            timeInMinutes: missionMinutes, 
            year: missionYear,
            date: missionDate, 
            purpose: purpose,
            spacecraft: spacecraft, 
            cosmoOrAstro: cosmoOrAstro
          }
        })
       .sort((a, b) => (a.date > b.date) ? 1 : -1)
      )

      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return(
    <div className="App">
      <div className="HorizontalFlexTitle">
        <div className="Title">
          Spacewalks
        </div>
        <div className="TitleHR">
        </div>
      </div>
      <div className="HorizontalFlexContent">
        <div className="AppLeftSide">
          <div className="SubTitle">
            USA and Russia, 1965-2013
          </div>
          <div className="IntroText">
            Dataset provided by&nbsp;
            <a href="https://data.nasa.gov/Raw-Data/Extra-vehicular-Activity-EVA-US-and-Russia/9kcy-zwvn">
              NASA's Open Data Portal</a>
              &nbsp;showing all activities done by an astronaut or cosmonaut outside a spacecraft beyond the Earth's appreciable atmosphere.
              <br/><br/><br/>
              Filter the results with the controls below:   
          </div>
          <FilterContainer filterMissionData={filterMissionData} setFilterMissionData={setFilterMissionData} originalMissionData={originalMissionData} />
        </div>
        <div className="AppRightSide">
            <PlotsContainer filterMissionData={filterMissionData}/>
        </div>
      </div>
    </div> 
  )
}

export default App

