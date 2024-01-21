import React, { useEffect, useState } from 'react';
import Result from '../components/Result';
import { RiSearch2Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, setSearchResults } from '../redux/searchSlice';
import loading from '../loading.gif'

const Home = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const searchResults = useSelector((state) => state.search.searchResults);
  const [showResults, setShowResults] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingResults, setLoadingResults] = useState(false);

  const handleSearch = async () => {
    const trimmedSearchTerm = searchTerm.trim();

    if (trimmedSearchTerm !== "") {
      try {
        setLoadingResults(true);
        const apiKey = '41889997-7e8f4b2b33eb278091ad77500';
        const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${trimmedSearchTerm}&image_type=photo&page=${page}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        const updatedResults = page === 1 ? data.hits : [...searchResults, ...data.hits];

        dispatch(setSearchResults(updatedResults));
        setShowResults(true);
      } catch (error) {
        console.error('Error fetching Pixabay data:', error);
      } finally {
        setLoadingResults(false);
      }
    } else {
      setShowResults(false);
      dispatch(setSearchResults([]));
    }
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleGoButtonClick = () => {
    handleSearch();
  };

  useEffect(() => {
    if (searchTerm !== "" && (document.activeElement.tagName !== 'INPUT' || searchTerm.length === 0)) {
      handleSearch();
    }
  }, [searchTerm, page]);

  const handleLoadMore = () => {
    setLoadingResults(true);
    setPage(page + 1);
  };

  const handleTrendClick = (trend) => {
    dispatch(setSearchTerm(trend));
  };

  return (
    <div>
      <div className={`px-5 lg:px-8 ${showResults ? '' : 'pt-8 lg:pt-14'}`}>
        {/* Title */}
        {!showResults && (
          <h1 className='text-center text-white text-2xl lg:text-7xl font-black leading-10 lg:leading-tight'>
            Discover over 2,000,000<br />free Stock Images
          </h1>
        )}
        {/* Search */}
        <div className={`sticky w-4/5 lg:w-1/2 mx-auto border-2 lg:border-[3px] border-white text-white rounded-md backdrop-filter backdrop-blur-lg border-opacity-40 px-4 py-3 flex justify-between items-center ${showResults ? '' : 'mt-10 lg:mt-20'}`}>
          <div className='flex items-center gap-2 lg:text-xl w-full'>
            <RiSearch2Line className='text-lg lg:text-2xl' /> |
            <input
              className='bg-transparent border-none w-full sm:w-2/3 md:w-3/4 lg:w-full focus:outline-none placeholder:text-white placeholder:font-semibold'
              type='text'
              placeholder='Search'
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              onKeyPress={handleEnter}
            />
          </div>
          <span
            className='font-semibold border-2 rounded-md px-3 cursor-pointer'
            onClick={handleGoButtonClick}
          >
            GO!
          </span>
        </div>
        {/* Trending */}
        {!showResults && (
          <div className='mx-auto w-4/6 lg:w-3/12 flex items-center justify-center p-1 lg:p-2 border-2 lg:border-[3px] border-white text-white rounded-md backdrop-filter backdrop-blur-lg border-opacity-40 mt-5 lg:mt-7 text-xs lg:text-base'>
            <span className='font-semibold'>Trending:</span>&nbsp;
            {['flowers', 'love', 'forest', 'river'].map((trend, index) => (
              <span
                key={index}
                className='cursor-pointer hover:underline'
                onClick={() => handleTrendClick(trend)}
              >
                {trend}
                {index !== 3 && ','}&nbsp;
              </span>
            ))}
          </div>
        )}
        {/* Results */}
        {showResults && (
          <p className='mt-8 text-xl font-black text-white text-center lg:text-5xl'>
            Results: {searchTerm}
          </p>
        )}
      </div>
      {loadingResults && <div className='w-full h-screen flex justify-center'><img className='w-10 h-10 md:w-16 md:h-16' src={loading} alt="Loading..." /></div>}
      {showResults && (
        <>
          <Result searchResults={searchResults} />
          <div className="text-center pt-2 pb-6">
            {loadingResults && <div className='w-full h-screen flex justify-center'><img className='w-10 h-10 md:w-16 md:h-16' src={loading} alt="Loading..." /></div>}
            <span className="text-white bg-orange-400 px-4 py-2 rounded-md cursor-pointer hover:bg-orange-500 active:bg-orange-600" onClick={handleLoadMore}>
              Click To Load More
            </span>
          </div>
        </>
      )}
    </div>
  )
}

export default Home;