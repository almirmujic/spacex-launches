import React, {useEffect, useState} from 'react';

import { Link } from 'react-router-dom';

//components
import Thumbnail from './components/Thumbnail';

//styling
import './App.css';

// https://api.spacexdata.com/v3/launches/

function App() {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offsetNum, setOffsetNum] = useState(0);

  const pullData = (data) => {
      const goodData = data.map(function(launch){
        return {
          missionName: launch.mission_name,
          smallPatch: launch.links.mission_patch_small,
          flightNum: launch.flight_number,
          year: launch.launch_year
        }
      });
      return goodData;
  }

  const goBack = () => {
    setOffsetNum(offsetNum - 20);
  }

  const goNext = () => {
    setOffsetNum(offsetNum + 20);
  }

  useEffect(()=>{
    async function fetchLaunches(){
      setLoading(true);
      const res = await fetch(`https://api.spacexdata.com/v3/launches/?limit=20${offsetNum > 0 ? `&offset=${offsetNum}` : '' }`);
      const data = await res.json();
      console.log(data)
      setLaunches(pullData(data));
      setLoading(false);
    }

    fetchLaunches();
  },[offsetNum])

  return (
    <div className="App">
      <h1 className="header h1">Welcome to SpaceX launches</h1>
      <div className='launch-grid'>
        {
          loading ? <h1>Loading...</h1> : 
          launches.map(launch=><Link to={`/${launch.flightNum}`} className="thumbnail-link"><Thumbnail missionName={launch.missionName} smallPatch={launch.smallPatch} year={launch.year} /></Link>)         
        }
      </div>
      <div>
        <button onClick={goBack}>Back</button>
        <button onClick={goNext}>Next</button>      
      </div>
    </div>
  );
}

export default App;
