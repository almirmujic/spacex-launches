import React, { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext();

export function ThemeProvider(props) {
    const savedTheme = JSON.parse(window.localStorage.getItem('theme') || 'true');

    const [dark, setDark] = useState(savedTheme);

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

    return (
        <ThemeContext.Provider value={toggleTheme}>
            {props.children}
        </ThemeContext.Provider>
    )
}
