import React, { createContext, useState, useEffect } from 'react'

//styling
import styled from 'styled-components';
import { Sun } from 'styled-icons/feather/Sun';
import { Moon } from 'styled-icons/feather/Moon';

export const ThemeContext = createContext();

const SwitchContainer = styled.div`
     position: fixed;
     width: 45px;
     height: 45px; 
     right: 20px; 
     bottom: 10px; 
     z-index: 2; 
     @media (min-width: 980px) {
        position: absolute;
        top: 35px;
        right: 10px;
    }
    &:hover{
        cursor: pointer;
    }
`

export function ThemeProvider(props) {
    const savedTheme = JSON.parse(window.localStorage.getItem('theme') || 'true');

    const [dark, setDark] = useState(savedTheme);

    const IconContainer = styled.div`
        width: 45px;
        height: 45px; 
        display: flex;
        justify-content: center; 
        align-items: center;
        border-radius: 50%;
        background-color: ${dark ? '#fafafa' : '#181818'};
        &:hover{
        cursor: pointer;
    }
`

    const toggleTheme = () => {
        setDark(!dark);
    }

    useEffect(() => {
        if (dark === false) {
            document.body.style.backgroundColor = '#fafafa';
            document.body.style.color = '#181818';
        } else {
            document.body.style.backgroundColor = '#181818';
            document.body.style.color = '#fafafa';
        };
        window.localStorage.setItem('theme', JSON.stringify(dark));
    }, [dark])

    const ThemeSwitch =
        <SwitchContainer >
            <IconContainer onClick={toggleTheme}>
                {dark ? <Sun style={{ color: '#181818', width: '30px' }} /> : <Moon style={{ color: '#fafafa', width: '30px' }} />}
            </IconContainer>
        </SwitchContainer>;

    return (
        <ThemeContext.Provider value={ThemeSwitch}>
            {props.children}
        </ThemeContext.Provider >
    )
}
