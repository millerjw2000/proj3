import React, { useState, useEffect } from 'react'
import { GrMoon, GrSun } from 'react-icons/gr'

export function LightDarkButton() {

    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light'
        setTheme(savedTheme)
    },[])

    useEffect(() => {
        document.body.className = theme
        localStorage.setItem('theme',theme)
    },[theme])

    const toggle = () => {
        
        if (theme === 'light') {
            setTheme('dark')
        } else {
            setTheme('light')
        }

    }

    return (

        <button className='toggle_button' onClick={toggle}>
            {theme === 'light' ? <GrMoon className='toggle_icon'/> : <GrSun className='toggle_icon'/>}
        </button>

    )

}