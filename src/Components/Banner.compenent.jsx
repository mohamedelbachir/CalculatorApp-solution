import React, { useState, useRef, useEffect } from 'react'
import '../styles/banner.style.scss'
import { THEME } from '../App'
export default function Banner({themeID,setTheme }) {
    const ref = useRef(null)
    let onceInit=false;
    useEffect(() => {
        if(window.localStorage.getItem("Theme")==null){
            window.localStorage.setItem("Theme",themeID)
        }
        setTheme(window.localStorage.getItem("Theme"))
        onceInit=true
        ref.current.addEventListener('click',()=>{
            setTheme((v)=>{
                return parseInt(v)+1
            })
        })
    }, []) 
    
    useEffect(() => {
        const thumb=ref.current.querySelector('.thumb');
        if(themeID>THEME.length-1){
            setTheme(0)
            thumb.style.left='0px'
        }else{
            thumb.style.left=(themeID>THEME.length-1)?thumb.offsetLeft:7+themeID*14-21+'px' 
        }
        
        if(!onceInit){
            window.localStorage.setItem("Theme",themeID)
        }
        onceInit=true
        //setTheme(themeID)
    }
    , [themeID])
    return <>
        <header className="banner">
            <div className="title-app">
                <h2>calc</h2>
            </div>
            <div className="theme-ctn">
                <label htmlFor="togglecheck">THEME : </label>
                <div className="themeSwitcher" ref={ref} id="togglecheck">
                    <div className="thumb"></div>
                </div>
            </div>
        </header>
    </>
}
