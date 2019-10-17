import React from 'react';

//styling
import styled from 'styled-components';

const FooterElement = styled.h4`
    margin: 0 auto;
    width: 80%;
    max-width: 980px;
    position: relative;
    opacity: .6;
    text-align: center;
    padding: 2em 1em 2em 1em;
    & a {
        color: inherit;
    }
`

export default function Footer() {
    return (
        <FooterElement>Created by <a href='https://almir.dev'>Almir</a></FooterElement>
    )
}
