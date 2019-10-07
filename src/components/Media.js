import React from 'react';
import PropTypes from 'prop-types';

export default function Media(props) {

    return (
        props.info.video ?
            <div style={{ display: 'flex', flexDirection: 'column', margin: '2em 0', paddingBottom: '1em', width: '100%' }}>
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
            </div>
            :
            ''
    )
}

Media.propTypes = {
    info: PropTypes.object
}