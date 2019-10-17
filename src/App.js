import React, { useContext } from 'react';

import { Link } from 'react-router-dom';

//context
import { DataContext } from './context/DataContext';
import { ThemeContext } from './context/ThemeContext';

//components
import Thumbnail from './components/Thumbnail';

//styling
import './App.css';
// eslint-disable-next-line
import styled from 'styled-components';
import { LeftArrow } from 'styled-icons/boxicons-solid/LeftArrow';
import { RightArrow } from 'styled-icons/boxicons-solid/RightArrow';

const Input = styled.input`
    display: block;
    margin: 0 auto;
    font-size: 16px;
    letter-spacing: .2px;
    margin-bottom: 3em;
    padding: .7em 1.3em; 
    border-radius: 24px;
    border: 1px solid #dfe1e5;
    &:hover{
      box-shadow:0 1px 6px 0 rgba(32,33,36,0.28);      
    }
    &:focus{
      box-shadow:0 1px 6px 0 rgba(32,33,36,0.28);
      outline: none;
    }
`

const ArrowContainer = styled.div`
  display: flex; 
  justify-content: center; 
  padding: 3em 2em 1em 2em; 
`

const Arrow = styled.div`
  width: 2em;
  height: 2em;
`

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

const LaunchGrid = styled.div`
  margin: 0 auto;
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, 120px);
  grid-gap: 3em;
  & a div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center; 
  }
`

function App() {
  const [launches, loading, offsetNum, setOffsetNum, pagination, filter, setFilter] = useContext(DataContext);
  const ThemeSwitch = useContext(ThemeContext);

  const handleChange = e => {
    setFilter(e.target.value);
  }

  const goNext = () => {
    setOffsetNum(offsetNum + 24);
  }

  const goBack = () => {
    setOffsetNum(offsetNum - 24);
  }

  const cleanLaunches = launches.filter(launch => launch.missionName.toLowerCase().includes(filter.toLowerCase()));

  const mapLaunches = cleanLaunches.map(launch =>
    <Link to={`/${launch.flightNum}`} key={launch.flightNum} className="thumbnail-link">
      <Thumbnail missionName={launch.missionName} smallPatch={launch.smallPatch} year={launch.year} />
    </Link>
  );

  const arrows =
    <ArrowContainer>
      {offsetNum < 24 ? '' : <Arrow onClick={goBack}><StyledLeftArrow /></Arrow>}
      {launches.length < 24 ? '' : <Arrow onClick={goNext}><StyledRightArrow /></Arrow>}
    </ArrowContainer>;


  return (
    <div className="App">
      {ThemeSwitch}
      <h1 className="header h1">Welcome to SpaceX launches</h1>
      <Input type='text' placeholder='Search mission...' value={filter} onChange={handleChange} />
      {
        loading ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> :
          <>
            <LaunchGrid>
              {mapLaunches}
            </LaunchGrid>
            {pagination ? arrows : ''}
          </>
      }
    </div>
  );
}

export default App;
