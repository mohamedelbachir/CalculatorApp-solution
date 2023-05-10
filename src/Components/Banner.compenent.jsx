import React, {useRef, useEffect,useState } from 'react'
import '../styles/banner.style.scss'
import { THEME } from '../App'
export default function Banner({themeID,setTheme }) {
    const ref = useRef(null)
    const [onceInit, setOnceInit] = useState(false)
    useEffect(() => {
        if(window.localStorage.getItem("Theme")==null){
            window.localStorage.setItem("Theme",themeID)
        }
        setTheme(window.localStorage.getItem("Theme"))
        setOnceInit(true)
        ref.current.addEventListener('click',()=>{
            setTheme((v)=>{
                return parseInt(v)+1
            })
        })
        //eslint-disable-next-line
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
        setOnceInit(false)
        //setTheme(themeID)
    }
    //eslint-disable-next-line
    , [themeID])
    return <>
        <header className="banner">
            <div className="title-app">
                <h2>calc</h2>
            </div>
            <div className="theme-ctn">
                <span id="togglecheck">THEME : </span>
                <div className="themeSwitcher" ref={ref} id="togglecheck">
                    <div className="thumb"></div>
                </div>
            </div>
        </header>
    </>
}
