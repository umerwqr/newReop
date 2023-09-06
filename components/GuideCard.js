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
      <div className="relative h-[130px] w-[100%] sm:h-full sm:w-full">
        <Image src={guide.img} alt="Guide" fill objectFit="contain" />
      </div>
      <div className="py-4 pl-4 w-full flex flex-col items-center sm:items-start">
        <div className="font-[600] text-[19px] sm:text-[24px] mb-2 flex">By: <p className="text-[#002E94] ml-1">{guide.name}</p></div>
        <div className="text-[#777777] text-sm mb-2">Posted: {guide.post}</div>
        <p className="text-[#777777]">
          {truncateText(guide.info, 21)}
        </p>
        <Link href="#" className="text-[#002E94] font-[500] hover:underline text-[16px] pt-2">
          Learn more...
        </Link>
      </div>
    </div>
  );
}

export default GuideCard;
