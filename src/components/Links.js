import React from 'react';
import PropTypes from 'prop-types';

//styling
import styled from 'styled-components';
import { Wikipedia } from 'styled-icons/boxicons-logos/Wikipedia';
import { Reddit } from 'styled-icons/boxicons-logos/Reddit';
import { News } from 'styled-icons/boxicons-solid/News';

const AnchorLink = styled.a`
     display: flex;
     flex-direction: column; 
     margin: 1em;
     color: inherit; 
     opacity: .4;
     text-decoration: none;
`

export default function Links(props) {

    const links = [
        {
            icon: News,
            link: props.info.article,
            name: 'Article'
        },
        {
            icon: Wikipedia,
            link: props.info.wiki,
            name: 'Wikipedia'
        },
        {
            icon: Reddit,
            link: props.info.reddit,
            name: 'Reddit'
        }
    ]

    return props.info ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1em' }}>
            {
                links.filter(link => link.link !== null).map(extraLink =>
                    <div key={extraLink.name}>
                        <AnchorLink href={extraLink.link} rel="noopener noreferrer" target="_blank">
                            <extraLink.icon style={{ height: '40px' }} />
                            <span style={{ fontSize: '14px' }}>{extraLink.name}</span>
                        </AnchorLink>
                    </div>
                )
            }
        </div>
    ) : (
            <div>Loading...</div>
        )
}

Links.propTypes = {
    info: PropTypes.object.isRequired
}