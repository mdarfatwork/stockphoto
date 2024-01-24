import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";

const FullDetails = ({result}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedQuality, setSelectedQuality] = useState("small"); // Default quality

  const handleQualityChange = (quality) => {
    setSelectedQuality(quality);
  };

  const handleDownload = async () => {
    let downloadUrl;
    switch (selectedQuality) {
      case "small":
        downloadUrl = result.previewURL;
        break;
      case "medium":
        downloadUrl = result.webformatURL;
        break;
      case "big":
        downloadUrl = result.largeImageURL;
        break;
      case "original":
        downloadUrl = result.largeImageURL;
        break;
      default:
        break;
    }
  
    const response = await fetch(downloadUrl);
    const blob = await response.blob();

    if (selectedQuality === "small") {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `image_${result.id}_${selectedQuality}`;
      link.click();
    }
      else{
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `image_${result.id}_${selectedQuality}`;
        link.click();
      }
    };
  
  
  return (
    <div className={`bg-black w-full h-full fixed top-0 left-0 rounded-lg bg-opacity-25 ${isOpen ? '' : 'hidden'}`}>
      <div className='fixed top-4 right-4 left-4 bottom-4 md:top-10 md:right-10 md:left-10 md:bottom-10 lg:right-20 lg:left-20 lg:top-14 lg:bottom-14 xl:right-40 xl:left-40 bg-white rounded-lg overflow-y-scroll xl:overflow-y-auto'>
        {/* header */}
        <div className='bg-neutral-200 rounded-t-lg p-3 sm:p-4 md:p-5 lg:p-6 2xl:p-8 flex justify-between items-center'>
          <h2 onClick={()=>console.log(result)} className='text-xl lg:text-2xl text-[#3B4043] font-semibold'>Preview ID:&nbsp;{result.id}</h2>
          <span onClick={()=>setIsOpen(false)} className='text-base lg:text-lg xl:text-xl rounded-md border-2 p-2 border-[#3B4043]'><RxCross2 /></span>
        </div>
        {/* Details */}
        <div className='w-full p-3 lg:p-5 flex flex-col xl:flex-row gap-2 xl:justify-between bg-white rounded-b-lg'>
          <div className='w-full xl:w-3/5'>
            <img className='w-full h-4/5 object-cover rounded-md' src={result.webformatURL} alt={result.tags} />
            <div className='pt-2 flex gap-2 xl:gap-3 lg:pt-4 xl:text-lg items-center'>
              <h4 className='text-base text-[#3B4043] font-semibold'>Tags:</h4>
              {result.tags.split(', ').map((tag, index) => (
                <span key={index} className='bg-neutral-100 text-[#767676] rounded-md p-2 text-sm'>{tag}</span>
              ))}
            </div>
          </div>
          <div className='w-full xl:w-1/3'>
            <h2 className='text-[#3B4043] text-2xl font-semibold xl:text-3xl'>Download</h2>
            {/* table */}
            <div className="overflow-x-auto rounded-lg my-3 xl:my-5">
                <table className="w-full text-sm text-left text-[#3B4043] border-2 rounded-lg">
                    <tbody>
                        <tr className={`border-b rounded-t-lg ${selectedQuality === "small" ? 'bg-neutral-100' : ''}`} onClick={() => handleQualityChange("small")}>
                            <th scope="row" className="px-6 py-4 font-medium">Small</th>
                            <td className="px-6 py-4 font-bold">640x960</td>
                            <td className="px-6 py-4"><span className={`rounded-full w-6 h-6 flex justify-center items-center text-white ${selectedQuality === "small" ? 'bg-[#4BC34B]' : 'border-2 bg-white'} `}><FaCheck /></span></td>
                        </tr>
                        <tr className={`border-b ${selectedQuality === "medium" ? 'bg-neutral-100' : ''}`} onClick={() => handleQualityChange("medium")}>
                            <th scope="row" className="px-6 py-4 font-medium">Medium</th>
                            <td className="px-6 py-4 font-bold">1920x2660</td>
                            <td className="px-6 py-4"><span className={`rounded-full w-6 h-6 flex justify-center items-center text-white ${selectedQuality === "medium" ? 'bg-[#4BC34B]' : 'border-2 bg-white'} `}><FaCheck /></span></td>
                        </tr>
                        <tr className={`border-b ${selectedQuality === "big" ? 'bg-neutral-100' : ''}`} onClick={() => handleQualityChange("big")}>
                            <th scope="row" className="px-6 py-4 font-medium">Big</th>
                            <td className="px-6 py-4 font-bold">2400x3600</td>
                            <td className="px-6 py-4"><span className={`rounded-full w-6 h-6 flex justify-center items-center text-white ${selectedQuality === "big" ? 'bg-[#4BC34B]' : 'border-2 bg-white'} `}><FaCheck /></span></td>
                        </tr>
                        <tr className={`border-b rounded-b-lg ${selectedQuality === "original" ? 'bg-neutral-100' : ''}`} onClick={() => handleQualityChange("original")}>
                            <th scope="row" className="px-6 py-4 font-medium">Original</th>
                            <td className="px-6 py-4 font-bold">{result.imageWidth}x{result.imageHeight}</td>
                            <td className="px-6 py-4"><span className={`rounded-full w-6 h-6 flex justify-center items-center  text-white ${selectedQuality === "original" ? 'bg-[#4BC34B]' : 'border-2 bg-white'} `}><FaCheck /></span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div onClick={handleDownload} className='text-white bg-[#4BC34B] rounded-md text-center py-3 lg:py-4 font-bold'>Download for free!</div>
            {/* information */}
            <div className='py-5 xl:py-7'>
              <h3 className='text-[#3B4043] text-xl lg:text-2xl font-semibold'>Information</h3>
              <div className='grid grid-cols-3 justify-between text-sm md:text-base xl:text-lg mt-4'>
                <span className='flex flex-col gap-1'>
                  <p className='text-[#717579] font-bold'>User</p>
                  <p className='text-[#3B4043] font-bold text-base md:text-lg xl:text-xl overflow-hidden'>{result.user}</p>
                </span>
                <span className='flex flex-col gap-1'>
                  <p className='text-[#717579] font-bold'>User ID</p>
                  <p className='text-[#3B4043] font-bold text-base md:text-lg xl:text-xl'>{result.user_id}</p>
                </span>
                <span className='flex flex-col gap-1'>
                  <p className='text-[#717579] font-bold'>Type</p>
                  <p className='text-[#3B4043] font-bold text-base md:text-lg xl:text-xl'>{result.type}</p>
                </span>
                <span className='flex flex-col gap-1'>
                  <p className='text-[#717579] font-bold'>Views</p>
                  <p className='text-[#3B4043] font-bold text-base md:text-lg xl:text-xl'>{result.views}</p>
                </span>
                <span className='flex flex-col gap-1'>
                  <p className='text-[#717579] font-bold'>Downloads</p>
                  <p className='text-[#3B4043] font-bold text-base md:text-lg xl:text-xl'>{result.downloads}</p>
                </span>
                <span className='flex flex-col gap-1'>
                  <p className='text-[#717579] font-bold'>Likes</p>
                  <p className='text-[#3B4043] font-bold text-base md:text-lg xl:text-xl'>{result.likes}</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullDetails