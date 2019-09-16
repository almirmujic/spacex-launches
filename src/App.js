import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

//components
import Thumbnail from './components/Thumbnail';

//styling
import './App.css';
// eslint-disable-next-line
import styled from 'styled-components';
import { LeftArrow } from 'styled-icons/boxicons-solid/LeftArrow';
import { RightArrow } from 'styled-icons/boxicons-solid/RightArrow';


// https://api.spacexdata.com/v3/launches/

function App() {
  const initialOffset = JSON.parse(window.localStorage.getItem('offset'));

  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offsetNum, setOffsetNum] = useState(initialOffset);


  const pullData = (data) => {
    const goodData = data.map(function (launch) {
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

  useEffect(() => {
    async function fetchLaunches() {
      setLoading(true);
      const res = await fetch(`https://api.spacexdata.com/v3/launches/?limit=20${offsetNum > 0 ? `&offset=${offsetNum}` : ''}`);
      const data = await res.json();
      console.log(data)
      window.localStorage.setItem('offset', JSON.stringify(offsetNum));
      setLaunches(pullData(data));
      setLoading(false);
    }

    fetchLaunches();
  }, [offsetNum])

  return (
    <div className="App">
      <h1 className="header h1">Welcome to SpaceX launches</h1>
      {
        loading ? <h1>Loading...</h1> :
          <>
            <div className='launch-grid'>
              {launches.map(launch => <Link to={`/${launch.flightNum}`} key={launch.flightNum} className="thumbnail-link"><Thumbnail missionName={launch.missionName} smallPatch={launch.smallPatch} year={launch.year} /></Link>)}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '2em', height: '2em' }} onClick={goBack}><LeftArrow /></div>
              <div style={{ width: '2em', height: '2em' }} onClick={goNext}><RightArrow /></div>
            </div>
          </>
      }
    </div>
  );
}

export default App;
