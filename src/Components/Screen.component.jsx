import React from 'react'
import '../styles/screen.style.scss'
export default function Screen({expression,value}) {
    return (
        <div className="screen" data-action={expression}>
            <input type="text" name="result" id="result" disabled={true} value={value}/>
        </div>
    )
}