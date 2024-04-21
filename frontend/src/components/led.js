import React, { useState } from 'react';
import { FaRegLightbulb } from "react-icons/fa";
import off from '../assets/off.png';
import on from '../assets/on.png'
import { FaPowerOff } from "react-icons/fa6";

function Led() {
    const [isLedOn, setIsLedOn] = useState(false);

    const handleLedOn = () => {
        setIsLedOn(true);
    };

    const handleLedOff = () => {
        setIsLedOn(false);
    };

    return (
        <div className="led">
            <div className='title led-title'>
                <p>Fan Controller</p>
                <FaRegLightbulb size={20} />
            </div>

            <div className="led-container">
                <img src={isLedOn ? on : off} id="led-off"alt="Led" />
            </div>
            <div className="led-button-container">
                <button
                    className={`turn-buttons ${isLedOn ? 'active' : ''}`}
                    id="led-on-button"
                    type="button"
                    onClick={handleLedOn}
                    disabled={isLedOn}
                >
                    <FaPowerOff size={14} className='turn-icons on' />
                    On
                    
                </button>
                <button
                    className={`turn-buttons ${!isLedOn ? 'active' : ''}`}
                    id="led-off-button"
                    type="button"
                    onClick={handleLedOff}
                    disabled={!isLedOn}
                >
                    <FaPowerOff size={14} className='turn-icons off' />
                    Off
                </button>
            </div>
        </div>

    );
}

export default Led;
