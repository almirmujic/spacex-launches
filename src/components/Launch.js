import React, { useEffect, useState } from 'react'

//components
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
            const res = await fetch(`https://api.spacexdata.com/v3/launches/${match.params.id}`);
            const data = await res.json();
            const objData = formatData(data);
            setInfo(objData);
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
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2em', width: '100%' }}>
                    {
                        info.youtube === null ? '' :
                            <div style={{
                                position: 'relative',
                                overflow: 'hidden',
                                paddingTop: '56.25%',
                                margin: '1em',
                            }}>
                                <iframe
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',

                                        border: 0
                                    }}
                                    id='iframe'
                                    src={`https://www.youtube.com/embed/${info.youtube}`}
                                    title={info.missionName}
                                    frameBorder="0"
                                    allow='autoplay; encrypted-media'
                                    allowFullScreen
                                />
                            </div>
                    }
                    {
                        info.imgs === undefined || info.imgs.length <= 0 ? '' :
                            <div style={{ width: '100%' }}>
                                <img src={info.imgs[0]} alt={info.name} style={{ width: '100%', padding: '1em' }} />
                            </div>
                    }
                    <Links info={info} />
                </div>
            </div>
        </div >
    )
}

export default Launch;