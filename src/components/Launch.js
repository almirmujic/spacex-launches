import React, { useEffect, useState, useContext } from 'react';

//context
import { ThemeContext } from '../context/ThemeContext';

//components
import Media from './Media';
import Links from './Links';

//styling
import '../App.css';
import styled from 'styled-components';

const Patch = styled.img`
    width: 200px;
    margin: 1em; 
`

function Launch({ match }) {

    const [info, setInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const ThemeSwitch = useContext(ThemeContext);

    const newFavicon = (src) => {
        let icon = document.getElementById('favicon');
        icon.href = `${src}`;
    }

    useEffect(() => {
        const formatData = (data) => {
            return {
                details: data.details || 'Details not currently available.',
                name: data.rocket.rocket_name,
                location: data.launch_site.site_name,
                video: data.links.video_link,
                youtube: data.links.youtube_id,
                imgs: data.links.flickr_images,
                smallPatch: data.links.mission_patch_small,
                patch: data.links.mission_patch,
                reddit: data.links.reddit_launch,
                article: data.links.article_link,
                wiki: data.links.wikipedia,
                missionName: data.mission_name,
                flightNum: data.flight_number,
                year: data.launch_year
            }
        }
        async function fetchLaunch() {
            try {
                setLoading(true);
                const res = await fetch(`https://api.spacexdata.com/v3/launches/${match.params.id}`);
                const data = await res.json();
                const objData = formatData(data);
                setInfo(objData);
                setLoading(false);
                info.missionName ? document.title = `SpaceX | ${info.missionName}` : document.title = `SpaceX | Launches`;
            } catch (error) {
                console.log(error)
                setLoading(false);
            }
        }
        fetchLaunch();
        newFavicon(info.smallPatch);
    }, [match.params.id, info.missionName, info.smallPatch])

    useEffect(() => {
        return () => {
            document.title = 'SpaceX | Launches';
            let icon = document.getElementById('favicon');
            icon.href = 'https://cynet-web.com/wp-content/uploads/2015/05/SEO-SPACESHIP-ICON-CYNET-white-320px.png';
        }
    }, [])


    return (
        <div className="App" >
            {ThemeSwitch}
            {
                loading ? <h1 style={{ textAlign: 'center', padding: '3em' }}>Loading...</h1> :
                    <>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                            <Patch src={info.patch} style={{ maxWidth: '200px', margin: '1em' }} />
                            <h1>{info.missionName}</h1>
                            <h3 style={{ margin: '.2em', opacity: '.4' }}>{info.name}</h3>
                            <span style={{ opacity: '.4' }}>{info.year}</span>
                            <h2 style={{ margin: '1em' }}>{info.location}</h2>
                            <p style={{ lineHeight: '1.5em', letterSpacing: '.6px' }}>{info.details}</p>
                        </div>
                        <Links info={info} />
                        <Media info={info} />
                    </>
            }
        </div >
    )
}

export default Launch;