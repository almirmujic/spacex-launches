import React, {useEffect, useState} from 'react'

export default function Launch({match}) {
    const [info, setInfo] = useState('');

    const formatData = (data) => {
        return {
            details: data.details,
            name: data.rocket.rocket_name,
            location: data.launch_site.site_name_long,
            video: data.links.video_link,
            imgs: data.links.flickr_images,
            smallPatch: data.links.mission_patch_small,
            patch: data.links.mission_patch,
            reddit: data.links.reddit_launch,
            wiki: data.links.wikipedia,
            missionName: data.mission_name,
            flightNum: data.flight_number,
            year: data.launch_year
        }
    }
    useEffect(()=>{
        async function fetchLaunch(){
            const res = await fetch(`https://api.spacexdata.com/v3/launches/${match.params.id}`);
            const data = await res.json();
            setInfo(formatData(data));
        }

        fetchLaunch();
    },[match.params.id])

    return (
        <div className="App">
            {console.log(info)}
            <h1>{info.missionName}</h1>
            <span>{info.name}</span>
        </div>
    )
}
