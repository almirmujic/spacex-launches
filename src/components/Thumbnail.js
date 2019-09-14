import React from 'react'

export default function Thumbnail(props) {
    return (
        <div style={{width: '100%'}}>
            <img alt={props.missionName} src={props.smallPatch} style={{width: '100%'}}></img>
            <div style={{paddingTop: '.5em', letterSpacing: '.3px'}}>
                <span>{props.missionName}</span>
                <br />            
                <span style={{opacity: '.4', fontSize:'14px'}}>{props.year}</span>
            </div>
        </div>
    )
}
