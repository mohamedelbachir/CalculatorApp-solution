import React from 'react'
import '../styles/screen.style.scss'
export default function Screen({value}) {
    return (
        <div className="screen">
            <input type="text" name="result" id="result" disabled={true} value={value}/>
        </div>
    )
}