import React from "react";
import '../Display/Display.css';

function Display({value}) {
    return (
        <div className="display">
            <p className="displayValue">
                {value}
            </p>
        </div>
    );
}

export default Display;