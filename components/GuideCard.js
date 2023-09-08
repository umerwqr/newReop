import React from 'react';
import Link from 'next/link'
import Image from 'next/image'
function GuideCard({ guide }) {
  const truncateText = (text, maxWords) => {
    const words = text.split(' ');
    if (words.length <= maxWords) {
      return text;
    }
    const truncatedText = words.slice(0, maxWords).join(' ');
    return `${truncatedText} ...`;
  };

  return (
    <div className="flex p-4  bg-white sm:flex-row flex-col ">
     
      <div className="py-4 pl-4 w-full flex flex-col items-center sm:items-start">
        {/* <img src={guide.speciality_icon}></img> */}
        <div className="font-[600] text-[19px] sm:text-[24px] mb-2 flex " style={{padding:"4px",paddingLeft:"6px",paddingRight:"9px",background:"#96D4D4",borderRadius:"4px"}}><p className=" ml-1">{guide.speciality_designation}</p></div>
      
      </div>
    </div>
  );
}

export default GuideCard;
