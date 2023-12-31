import React from 'react';
import Image from 'next/image';

function ItemCard({ option }) {
  return (
    <div className={`cursor-pointer  rounded-md px-4 py-5 m-4 md:w-[300px] w-[200px] h-[80px] md:h-[120px]  flex flex-col items-center`} style={{background: `${option.bg}`}}>
      <div className="rounded-full picShadow bg-white w-12 h-12 md:h-16 md:w-16 flex items-center justify-center mb-2 mt-[-2.6rem]">
        <Image src={option.img} alt="Option Image" width={30} height={30} />
      </div>
      <div className="font-[600] text-[24px] fontPop">{option.name}</div>
    </div>
  );
}

export default ItemCard;
