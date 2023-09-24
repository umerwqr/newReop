import WebFooter from '@/components/WebFooter';
import WebHeader from '@/components/WebHeader';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Input, Pagination, Radio } from 'antd';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'
import Data from '@/data/Data';
import ItemCard from '@/components/ItemCard';
import React from 'react';
import Link from 'next/link'
import Loader from '@/components/Loader';
import axios from 'axios';
const Name = () => {

  const router = useRouter();
  const { options, program_id } = router.query;
  const [searchText, setSearchText] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('PREP Mode');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [optionName, setOptionName] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);

  const [loading, setLoading] = useState(false);
  const pageSize = 10; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentItems = filteredOptions && filteredOptions.slice(startIndex, endIndex);

  const findOptionsByName = (name) => {
    const foundOptions = Data.find((item) => true);
    if (foundOptions) {
      setSelectedData(foundOptions)
      setSelectedOptions(foundOptions.options);
      // setFilteredOptions(foundOptions.options);
    } else {
      setSelectedOptions([]);
      setSelectedData({});
      // setFilteredOptions([]);
    }
  };

  useEffect(() => {
    if (options) {
      const parsedOptions = JSON.parse(options);
      findOptionsByName(parsedOptions);
    }
  }, [options]);

  useEffect(() => {
    // if (searchText) {
    //   const filtered = selectedOptions.filter(option => option.name.toLowerCase().includes(searchText.toLowerCase()));
    //   setFilteredOptions(filtered);
    // } else {
    //   setFilteredOptions(selectedOptions);
    // }
    const fetchData = async () => {
      if(searchText !== ''){
      try {
        const response = await axios.post("/api/search_mcqs", { key: "Vx0cbjkzfQpyTObY8vfqgN1us", wordSearch: searchText.toLowerCase() });
        setFilteredOptions(response.data.mcqs);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    }
    fetchData();
  }, [searchText]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchText('');
  };

  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  function getOptionText(optionName) {

    switch (optionName) {
      case 'Subject MCQs':
        return 'mcqs';
      case 'Guidlines':
        return 'guideCard';
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
      case 'Tutorials':
        return 'tutorials';
      case 'MCQs_Discussion':
        return 'Discussion';
      case 'Join_Us':
        return 'join_us';
      case 'Mentors':
        return 'mentors';
      default:
        return '';
    }

  }

  return (
    <>
      {loading ? (
        <div style={{ width: "100%", height: "600px", display: "flex", justifyContent: "center", alignItems: "center", }}>


          <Loader />
        </div>
      ) : (
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
              {!searchText && 
              <div className="my-[3rem]   flex justify-center w-full   flex-wrap px-6" >
                <div className="flex  sm:w-[90%] w-full flex-wrap justify-center" >
                  {selectedOptions.map((option, index) => {
                    const optionName = getOptionText(option.name);
                    return (
                      <Link
                      href={{
                        pathname: `/items/name/${optionName}`,
                        query: {
                          
                          program_id: program_id
                        }
                      }}
                        key={index}
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
              }
              <div className='flex flex-col items-center justify-center'>
              {currentItems && currentItems?.map((item, index) => (
              <div key={item?.id}>
              <div className="bg-white w-full sm:w-[80%] lg:w-[700px] rounded-lg text-black py-5 px-[1.5rem] my-[3rem] shadow-md ">
              <div className="flex  items-center justify-center w-full space-x-6 font-bold">
                Question # {index+1}
              </div>
              <div className="my-6  md:mx-[2rem] font-[500] text-[18px]">
                    <>{item?.question}</>
              </div>
            </div>
            <div className="text-black  flex justify-center items-center md:space-x-6 " style={{ width: "100%" }}>
              <div className="w-full">
                <div className="w-full flex flex-col ">
                  <div className="flex flex-col font-[500] text-[18px] space-y-5 mt-14">
                        <>
                          <>
                              <div>
                                <div
                                  className={`rounded-lg border py-3 px-3 flex items-center transition duration-300 ease-in-out transform hover:scale-104.5 hover:shadow-md cursor-pointer `}
                                >
                                  A) {item?.mcq1}
                                </div>
                              </div>
                              <div>
                                <div
                                  className={`rounded-lg border py-3 px-3 flex items-center transition duration-300 ease-in-out transform hover:scale-104.5 hover:shadow-md cursor-pointer `}
                                >
                                  B) {item?.mcq1} 
                                </div>
                              </div>
                              <div>
                                <div
                                  className={`rounded-lg border py-3 px-3 flex items-center transition duration-300 ease-in-out transform hover:scale-104.5 hover:shadow-md cursor-pointer `}
                                >
                                  C) {item?.mcq1}
                                </div>
                              </div>
                              <div>
                                <div
                                  className={`rounded-lg border py-3 px-3 flex items-center transition duration-300 ease-in-out transform hover:scale-104.5 hover:shadow-md cursor-pointer `}
                                >
                                  D) {item?.mcq1} 
                                </div>
                              </div>

                          </>
                        </>
                  </div>
                </div>
              </div>
            </div>
            </div>
              ))}
              <Pagination style={{marginTop: '30px'}} defaultCurrent={1} onChange={handlePageChange} total={filteredOptions && filteredOptions?.length}/>
              </div>
            </div>
          </main>
          <WebFooter />
        </div>)}
    </>
  );
};

export default Name;