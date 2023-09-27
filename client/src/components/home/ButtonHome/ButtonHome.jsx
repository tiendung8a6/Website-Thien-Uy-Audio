import React from "react";
import './buttonHome.css'

const Button = ({ children }) => {
    return (
        <button className="button-home">
            <span>
                {children}
            </span>
        </button>
    );
}

export default Button;