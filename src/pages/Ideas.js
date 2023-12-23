import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Banner from '../components/Banner';
import { TextField, Select, MenuItem, Pagination } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';

const Ideas = () => {
  const [ideasData, setIdeasData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sortOrder, setSortOrder] = useState('published_at');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://suitmedia-backend.suitdev.com/api/ideas', {
          params: {
            'page[number]': currentPage,
            'page[size]': postsPerPage,
            append: ['small_image', 'medium_image'],
            sort: sortOrder
          }
        });
        setIdeasData(response.data.data);
        setFilteredData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, postsPerPage, sortOrder]);

  const handleDateFilter = () => {
    const filtered = ideasData.filter(data => {
      const createdDate = new Date(data.created_at);
      return startDate && endDate ? (createdDate >= startDate && createdDate <= endDate) : true;
    });
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => setCurrentPage(value);

  const handlePostsPerPageChange = event => {
    const value = parseInt(event.target.value);
    setPostsPerPage(value);
    setCurrentPage(1);
  };

  const handleSortChange = event => {
    const value = event.target.value;
    setSortOrder(value);
    setCurrentPage(1);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

  
  return (
    <div>
      <Header />
      <Banner />
      <div className="flex justify-between items-center mx-4 my-4">
        <div className="flex items-center">
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={date => setStartDate(date)}
            renderInput={props => <TextField {...props} />}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={date => setEndDate(date)}
            renderInput={props => <TextField {...props} />}
          />
          <button onClick={handleDateFilter}>Filter</button>
        </div>
        <div>
          <Select value={postsPerPage} onChange={handlePostsPerPageChange}>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
          <span>Show per page</span>
          <Select value={sortOrder} onChange={handleSortChange}>
            <MenuItem value="published_at">Newest</MenuItem>
            <MenuItem value="-published_at">Oldest</MenuItem>
          </Select>
          <span>Sort by</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 justify-start">
        {filteredData.map(data => (
          <div key={data.id} className="w-80 bg-white rounded-xl drop-shadow-xl mb-4">
            <div className="rounded-t-xl overflow-hidden">
              <img src={data.medium_image[0]?.url} alt="Article" className="w-full h-48 object-cover" />
            </div>
            <div className="px-6 py-5">
              <h6 className="text-gray-500 mt-2">{data.created_at}</h6>
              <h4 className="font-semibold mt-1 overflow-hidden line-clamp-3">{data.title}</h4>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          count={Math.ceil(filteredData.length / postsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
        
      </div>
    </div>
  );
};

export default Ideas;
