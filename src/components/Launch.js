import React, { useEffect, useState } from 'react'

//components
import Media from './Media';
import Links from './Links';

//styling
import '../App.css'
import styled from 'styled-components'


const Patch = styled.img`
    width: 200px;
    margin: 1em; 
`

function Launch({ match }) {
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false);

    const formatData = (data) => {
        return {
            details: data.details,
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

    useEffect(() => {
        async function fetchLaunch() {
            setLoading(true);
            const res = await fetch(`https://api.spacexdata.com/v3/launches/${match.params.id}`);
            const data = await res.json();
            const objData = formatData(data);
            setInfo(objData);
            setLoading(false)
        }

        fetchLaunch();
    }, [match.params.id])



    return (
        <div className="App" >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Patch src={info.patch} style={{ maxWidth: '200px', margin: '1em' }} />
                <h1>{info.missionName}</h1>
                <h3 style={{ margin: '.2em', opacity: '.4' }}>{info.name}</h3>
                <span style={{ opacity: '.4' }}>{info.year}</span>
                <h2 style={{ margin: '1em' }}>{info.location}</h2>
                <p style={{ lineHeight: '1.5em', letterSpacing: '.6px' }}>{info.details}</p>
            </div>
            <Media info={info} />
            <Links info={info} />
        </div >
    )
}

export default Launch;