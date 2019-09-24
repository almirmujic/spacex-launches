import React from 'react'

export default function Thumbnail(props) {
    return (
        <div>
            {props.smallPatch ?
                <img alt={props.missionName} src={props.smallPatch} style={{ width: '70%' }}></img>
                : <img src='https://community.coreldraw.com/resized-image/__size/680x1000/__key/CommunityServer.Discussions.Components.Files/704/7418.NO.png' alt='Not Available' style={{ width: '70%' }}></img>
            }
            <div style={{ paddingTop: '.5em', letterSpacing: '.3px' }}>
                <span>{props.missionName}</span>
                <span style={{ opacity: '.4', fontSize: '14px' }}>{props.year}</span>
            </div>
        </div>
    )
}
