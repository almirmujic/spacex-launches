import React from 'react'

//styling
import styled from 'styled-components'
import { Wikipedia } from 'styled-icons/boxicons-logos/Wikipedia';
import { Reddit } from 'styled-icons/boxicons-logos/Reddit';
import { News } from 'styled-icons/boxicons-solid/News';

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

    return (
        <div>
            <h3>Links</h3>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {
                    links.map(extraLink =>
                        <div key={extraLink.name}>
                            <a href={extraLink.link} rel="noopener noreferrer" target="_blank" style={{ display: 'flex', flexDirection: 'column', margin: '1em', color: 'inherit', opacity: '.4', textDecoration: 'none' }}>
                                <extraLink.icon style={{ height: '50px' }} />
                                <span>{extraLink.name}</span>
                            </a>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
