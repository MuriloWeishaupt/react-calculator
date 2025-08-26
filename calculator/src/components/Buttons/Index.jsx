import "./Buttons.css"
import React from "react"

function Index({action, type, label }) {
    return (
            <p onClick={action} className={`buttons ${type ? type: ""}`}>
            {label}</p>
    )
}

export default Index;
