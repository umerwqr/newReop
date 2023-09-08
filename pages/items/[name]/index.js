import WebFooter from '@/components/WebFooter';
import WebHeader from '@/components/WebHeader';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Input, Radio } from 'antd';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import {useRouter} from 'next/router'
import Data from '@/data/Data'; 
import ItemCard from '@/components/ItemCard';
import React from 'react';
import Link from 'next/link'
const Name = () => {

const router = useRouter();
  const { options } = router.query; 
  const [searchText, setSearchText] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('PREP Mode');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [optionName, setOptionName] = useState('');

  const findOptionsByName = (name) => {
    const foundOptions = Data.find((item) => true);
    if (foundOptions) {
      setSelectedData(foundOptions)
      setSelectedOptions(foundOptions.options);
    } else {
      setSelectedOptions([]);
      setSelectedData({}); 
    }
  };

  console.log(optionName)

  useEffect(() => {

    if (options) {
      const parsedOptions = JSON.parse(options);
      findOptionsByName(parsedOptions);
    
    }
  });


  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchText('');
  };

  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.value);
  };

  function getOptionText(optionName) {
    switch (optionName) {
      case 'Subject MCQs':
        return 'mcqs';
      case 'Guidlines':
        return 'guide';
      case 'Past Papers':
        return 'papers';
      case 'Mock Exams':
        return 'mock';
      case 'Flash Cards':
        return 'card';
      case 'Notes':
        return 'notes';
      case 'Bookmarked':
        return 'bookmarks';
      default:
        return ''; 
    }
  }



  return (
    <div className="">
       <WebHeader />
      <main className="w-full h-full xxl:h-[100vh] flex items-center xl:items-start justify-center">
        <div className=" py-[6rem] px-4   w-full">
        <div className="w-full   flex flex-col items-center ">
        <div className="md:w-[45%] w-full">
          <div className="relative  w-full flex items-center justify-between mb-4">
            <Image
              src="/images/search.svg"
              alt="Search Icon"
              width={13}
              height={13}
              className="absolute left-3"
            />
            <Input
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search here"
              className="w-full px-10 py-2 bg-[#268FDA0D] border border-[#0000002B]"
            />
            {searchText && (
              <Image
                src="/images/cross.svg"
                width={10}
                height={10}
                className="cursor-pointer absolute right-3"
                onClick={handleClearSearch}
                alt="crossIcon"
              />
            )}
          </div>
          <div className="flex space-x-4">
            <Radio.Group onChange={handleRadioChange} value={selectedRadio}>
              <Radio
                value="PREP Mode"
                className={selectedRadio === 'PREP Mode' ? 'red-radio ' : ''}
              >
                PREP Mode
              </Radio>
              <Radio
                value="Exam Mode"
                className={selectedRadio === 'Exam Mode' ? 'red-radio' : ''}
              >
                Exam Mode
              </Radio>
            </Radio.Group>
          </div>
          </div>
          </div>
          <div className="my-[3rem]   flex justify-center w-full   flex-wrap px-6">
            <div className="flex  sm:w-[90%] w-full flex-wrap">
            {selectedOptions.map((option, index) => {
  const optionName = getOptionText(option.name);
  return (
    <Link
      href={`/items/name/${optionName}?index=${index}&optionName=${option.name}&selectedData=${encodeURIComponent(JSON.stringify(selectedData))}`}
      key={option.name}
    >
      <ItemCard
        option={option}
        img={`/images/${option.name}.jpg`}
      />
    </Link>
  );
})}



        </div>
      </div>
        </div>
      </main>
      <WebFooter />
    </div>
  );
};

export default Name;