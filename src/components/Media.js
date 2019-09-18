import React from 'react'

export default function Media(props) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2em', width: '100%' }}>
            {
                props.info.youtube === null ? '' :
                    <div style={{
                        position: 'relative',
                        overflow: 'hidden',
                        paddingTop: '56.25%',
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
                            src={`https://www.youtube.com/embed/${props.info.youtube}`}
                            title={props.info.missionName}
                            frameBorder="0"
                            allow='autoplay; encrypted-media'
                            allowFullScreen
                        />
                    </div>
            }
            {
                props.info.imgs === undefined || props.info.imgs.length <= 0 ? '' :
                    <div style={{ width: '100%' }}>
                        <img src={props.info.imgs[0]} alt={props.info.name} style={{ width: '100%', padding: '1em' }} />
                    </div>
            }
        </div>
    )
}
