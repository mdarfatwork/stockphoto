import React, { useState, useEffect } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../redux/searchSlice';
import FullDetails from './FullDetails';

const Result = ({ searchResults }) => {
  const dispatch = useDispatch();
  const [tagSuggestions, setTagSuggestions] = useState([]);
  const [visibleTagIndex, setVisibleTagIndex] = useState(0);
  const [selectedImageId, setSelectedImageId] = useState(null);

  const getTagSuggestions = () => {
    if (searchResults.length === 0) {
      setTagSuggestions([]);
      return;
    }

    const tagCount = {};
    searchResults.forEach((result) => {
      result.tags.split(', ').forEach((tag) => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    });

    const sortedTags = Object.keys(tagCount).sort(
      (a, b) => tagCount[b] - tagCount[a]
    );

    setTagSuggestions(sortedTags.slice(0, 20));
  };

  useEffect(() => {
    getTagSuggestions();
  }, [searchResults]);

  const showNextTags = () => {
    const nextIndex = visibleTagIndex + 10;
    setVisibleTagIndex(Math.min(nextIndex, tagSuggestions.length - 10));
  };

  const showPreviousTags = () => {
    const prevIndex = visibleTagIndex - 10;
    setVisibleTagIndex(Math.max(prevIndex, 0));
  };

  const handleImageClick = (imageId) => {
    setSelectedImageId(imageId === selectedImageId ? null : imageId);
  };

  if (searchResults.length === 0) {
    return (
      <div className='w-full mt-8 lg:mt-14 bg-white min-h-[70vh]'>
        <p className='text-center text-lg font-semibold text-neutral-500 p-10'>
          No images found for the given search.
        </p>
      </div>
    );
  }

  return (
    <div className='w-full bg-white'>
      {/* suggestion */}
      <div className='bg-neutral-100 p-3 items-center text-[#767676] px-5 lg:px-12 gap-3 hidden lg:flex'>
        <IoIosArrowBack className='text-3xl font-normal text-neutral-500' onClick={showPreviousTags} />
        {tagSuggestions.slice(visibleTagIndex, visibleTagIndex + 10).map((tag, index) => (
          <span
            key={index}
            className='border-2 w-32 lg:w-36 rounded-md flex items-center justify-center text-center py-2'
            onClick={()=>dispatch(setSearchTerm(tag))}
          >
            {tag}
          </span>
        ))}
        <IoIosArrowForward className='text-3xl font-normal text-neutral-500' onClick={showNextTags} />
      </div>
      {/* Result */}
      <div className='px-5 lg:px-12 py-8 lg:py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-x-12 lg:gap-x-20'>
        {searchResults.map((result) => (
          <div key={result.id}>
            <img
              className='rounded-lg object-cover w-full h-4/5'
              src={result.webformatURL}
              alt={result.tags}
              onClick={() => handleImageClick(result.id)}
            />
            <div className='py-2 flex gap-2 lg:gap-3 lg:py-4 lg:text-lg'>
              {result.tags.split(', ').slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className='bg-neutral-100 text-[#767676] rounded-md p-2'
                  onClick={()=>dispatch(setSearchTerm(tag))}
                >
                  {tag}
                </span>
              ))}
            </div>
            {selectedImageId === result.id && <FullDetails result={result} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;