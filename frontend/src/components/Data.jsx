import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/data.css';
import { FaSearch, FaSort } from 'react-icons/fa';
import { format } from 'date-fns';

const Data = (totalSearchRecords, totalSearchPages) => {
    const [sensorData, setSensorData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const [page, setPage] = useState(1);
    const limit = 10;
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchType, setSearchType] = useState('temperature');

    useEffect(() => {
        fetchData();
    }, [page, searchType, searchKeyword]);

    // useEffect(() => {
    //     fetchData();
    //   }, []); 

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/sensor/getAllSensors?page=${page}&limit=${limit}`);
            setSensorData(response.data.sensorData);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching sensor data:', error);
        }
    };

    const fetchSensorData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/sensor/searchSensors?type=${searchType}&keyword=${searchKeyword}&page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching sensor data:', error);
        }
    };

    const handleSearch = async () => {
        try {
            const data = await fetchSensorData();
            if (data && data.totalSearchPages >= 0) {
                setSensorData(data.sensorData);
                setTotalPages(Math.ceil(data.totalSearchPages / limit));
                console.log('total search page:', Math.ceil(data.totalSearchPages / limit))
                setPage(1); // Reset page to 1 when performing a new search
            } else {
                // Handle case where no results are found or there's an error
                setSensorData([]);
                setTotalPages(0);
                console.error('Error fetching sensor data:', data);
            }
        } catch (error) {
            console.error('Error fetching sensor data:', error);
        }
    };



    const calculateOrderNumber = (index) => {
        return (page - 1) * limit + index + 1;
    };

    const handlePageChange = (pageNumber) => {
        const newPage = pageNumber;
        setPage(newPage);
    };


    return (
        <div>
            <div className="top-button-area">
                <div className="search-container">
                    <input type="text" className="search-input" placeholder="Search..." value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)} />
                    <button className="search-button" id="search-button" onClick={handleSearch}>
                        <FaSearch size={20} />
                    </button>
                </div>
                <select className="filter-area data-filter" id="filter-select" value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}>
                    <option value="temperature">Temperature</option>
                    <option value="humidity">Humidity</option>
                    <option value="brightness">Light</option>
                </select>
            </div>
            <div className="table-area">
                <table className="sensor-table">
                    <thead>
                        <tr>
                            <th>
                                <div className='flex justify-center items-center gap-2'>
                                    Order
                                    <button
                                        className='bg-[#f2f2f2] border-none shadow-none'
                                    >
                                        <FaSort size={24} className='hover:text-gray-600' />
                                    </button>
                                </div>
                            </th>
                            <th>
                                <div className='flex justify-center items-center gap-3'>
                                    Temperature
                                    <button
                                        className='bg-[#f2f2f2] border-none shadow-none'
                                    >
                                        <FaSort size={24} className='hover:text-gray-600' />
                                    </button>
                                </div>
                            </th>
                            <th><div className='flex justify-center items-center gap-3'>
                                Humidity
                                <button
                                    className='bg-[#f2f2f2] border-none shadow-none'
                                >
                                    <FaSort size={24} className='hover:text-gray-600' />
                                </button>
                            </div>
                            </th>
                            <th><div className='flex justify-center items-center gap-3'>
                                Light
                                <button
                                    className='bg-[#f2f2f2] border-none shadow-none'
                                >
                                    <FaSort size={24} className='hover:text-gray-600' />
                                </button>
                            </div>
                            </th>
                            <th>
                                <div className='flex justify-center items-center gap-3'>
                                    Time
                                    <button
                                        className='bg-[#f2f2f2] border-none shadow-none'
                                    >
                                        <FaSort size={24} className='hover:text-gray-600' />
                                    </button>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sensorData.map((sensor, index) => (
                            <tr key={index}>
                                <td>{calculateOrderNumber(index)}</td>
                                <td>{sensor.temperature}°C</td>
                                <td>{sensor.humidity}%</td>
                                <td>{sensor.brightness} Lux</td>
                                <td>{format(new Date(sensor.datetime), 'yyyy-MM-dd HH:mm:ss')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ul className="pagination">
                <li>
                    <button
                        className="table-navigate-button"
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                </li>
                {[...Array(totalPages).keys()].map((pageNumber) => (
                    <li key={pageNumber}>
                        <button
                            onClick={() => handlePageChange(pageNumber + 1)}
                            className={page === pageNumber + 1 ? 'active-page' : 'page-number'}
                        >
                            {pageNumber + 1}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        className="table-navigate-button"
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Data;
