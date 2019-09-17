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

const StyledLeftArrow = styled(LeftArrow) `
  opacity: .2;
  &:hover{
    opacity: 1;
    cursor: pointer;
  }
`

const StyledRightArrow = styled(RightArrow) `
  opacity: .2;
  &:hover{
    opacity: 1;
    cursor: pointer;
  }
`

// https://api.spacexdata.com/v3/launches/

function App() {
  const initialOffset = JSON.parse(window.localStorage.getItem('offset') || '0');

  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offsetNum, setOffsetNum] = useState(initialOffset);
  const [filter, setFilter] = useState('');
  const [pagination, showPagination] = useState(true);


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
    setOffsetNum(offsetNum - 24);
  }

  const goNext = () => {
    setOffsetNum(offsetNum + 24);
  }

  useEffect(() => {
    async function fetchLaunches() {
      setLoading(true);
      if (filter === '') {
        const res = await fetch(`https://api.spacexdata.com/v3/launches/?limit=24${offsetNum > 0 ? `&offset=${offsetNum}` : ''}`);
        const data = await res.json();
        const newData = pullData(data);
        setLaunches(newData);
        showPagination(true);
      } else {
        showPagination(false);
        const res = await fetch(`https://api.spacexdata.com/v3/launches/`);
        const data = await res.json();
        const newData = pullData(data).filter(launch => launch.missionName.toLowerCase().includes(filter.toLowerCase()));
        setLaunches(newData);
      }
      window.localStorage.setItem('offset', JSON.stringify(offsetNum));
      setLoading(false);
    }

    fetchLaunches();
  }, [offsetNum, filter])


  const handleChange = (e) => {
    setFilter(e.target.value);
  }

  return (
    <div className="App">
      <h1 className="header h1">Welcome to SpaceX launches</h1>
      <input type='text' onChange={handleChange} />
      {
        loading ? <h1>Loading...</h1> :
          <>
            <div className='launch-grid'>
              {launches.map(launch => <Link to={`/${launch.flightNum}`} key={launch.flightNum} className="thumbnail-link"><Thumbnail missionName={launch.missionName} smallPatch={launch.smallPatch} year={launch.year} /></Link>)}
            </div>
            {
              pagination ?
                <div style={{ display: 'flex', justifyContent: 'center', padding: '2em' }}>
                  {offsetNum < 24 ? '' : <div style={{ width: '2em', height: '2em' }} onClick={goBack}><StyledLeftArrow /></div>}
                  {launches.length < 24 ? '' : <div style={{ width: '2em', height: '2em' }} onClick={goNext}><StyledRightArrow /></div>}
                </div> : ''
            }
          </>
      }
    </div>
  );
}

export default App;
