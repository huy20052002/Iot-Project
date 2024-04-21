import React, { useState, useEffect } from 'react';
import '../css/data.css'
import '../css/history.css'
import axios from 'axios';
import { FaSearch, FaSort } from "react-icons/fa";
import { format } from 'date-fns';

const History = () => {

  const [actionData, setActionData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchOption, setSearchOption] = useState('device');
  // Lưu trữ searchOption và searchKeyword khi thực hiện tìm kiếm
  const [searchOptionTemp, setSearchOptionTemp] = useState('');
  const [searchKeywordTemp, setSearchKeywordTemp] = useState('');

  const fetchData = async () => {
    try {

      const response = await axios.get(`http://localhost:4000/action/getAllActions?page=${page}&limit=${limit}`);
      setActionData(response.data.actionData);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching action data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, searchOption, searchKeyword]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };


  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/action/searchActions?option=${searchOption}&keyword=${searchKeyword}&page=${page}&limit=${limit}`);
      setActionData(response.data.actionData);
      setTotalPages(response.data.totalPages); // Update total pages from the returned data
    } catch (error) {
      console.error('Error fetching search data:', error);
    }
  };


  useEffect(() => {
    // Thực hiện fetchData nếu không đang thực hiện tìm kiếm
    if (!searching) {
      fetchData();
    }
  }, [page, searchOptionTemp, searchKeywordTemp, searching]);

  // Đặt searching về false khi fetchData hoàn thành
  useEffect(() => {
    if (searching && actionData.length > 0) {
      setSearching(false);
    }
  }, [actionData, searching]);



  const calculateOrderNumber = (index) => {
    return (page - 1) * limit + index + 1;
  };

  return (
    <div>
      <div className="top-button-area">
        <div className="search-container">
          <input type="text"
            className="search-input"
            placeholder="Search..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)} />
          <button className="top-button" id="search-button" onClick={handleSearch}>
            <FaSearch size={20} />
          </button>
        </div>
        <select
          className="filter-area"
          id="filter-select"
          value={searchOption}
          onChange={(e) => setSearchOption(e.target.value)}
        >
          <option value="device">Device</option>
          <option value="action">Action</option>
        </select>
      </div>
      <div className='table-area'>
        <table className='history-table'>
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
                Device
              </th>
              <th>
                Action
              </th>
              <th><div className='flex justify-center items-center gap-3'>
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
            {actionData && actionData.map((action, index) => (
              <tr key={index}>
                <td>{calculateOrderNumber(index)}</td>
                <td>{action.device}</td>
                <td>{action.mode}</td>
                <td>{format(new Date(action.datetime), 'yyyy-MM-dd HH:mm:ss')}</td>
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
              key={pageNumber}
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

export default History;
