import React from 'react';
import PropTypes from 'prop-types';

//styling
import styled from 'styled-components';

const VideoContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2em 0;
    padding-bottom: 1em;
    width: 100%;
`

const VideoWrapper = styled.div`
    position: relative;
    overflow: hidden;
    padding-top: 56.25%;
`

const VideoIframe = styled.iframe`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
`

export default function Media(props) {

    return (
        props.info.video ?
            <VideoContainer>
                <VideoWrapper>
                    <VideoIframe
                        id='iframe'
                        src={`https://www.youtube.com/embed/${props.info.youtube}`}
                        title={props.info.missionName}
                        frameBorder="0"
                        allow='autoplay; encrypted-media'
                        allowFullScreen
                    />
                </VideoWrapper>
            </VideoContainer>
            :
            ''
    )
}

Media.propTypes = {
    info: PropTypes.object
}