import React from 'react'
import '../css/dashboard.css'
import '../css/sensor.css'
import { FaTemperatureLow } from "react-icons/fa"
import { WiHumidity } from "react-icons/wi";
import { FiSun } from "react-icons/fi";

const Sensor = () => {
    
    return (
        <div className='container'>
            <div className="temp" id="temperature">
                <div className='title sensor-title'>
                    <p>Temperature Sensor</p>
                    <FaTemperatureLow size={22} />
                </div>
                <span id="tempValue">0°C</span>
            </div>

            <div className="humid" id="humidity">
                <div className='title'>
                    <p>Humidity Sensor</p>
                    <WiHumidity size={30} />
                </div>
                <span id="humidValue">0%</span>
            </div>

            <div className="light" id="light">
                <div className='title sensor-title'>
                    <p>Light Sensor</p>
                    <FiSun size={24} />
                </div>
                <span id="lightValue">0 Lux</span>
            </div>
        </div>
    )
}

export default Sensor
