import WebFooter from '@/components/WebFooter';
import WebHeader from '@/components/WebHeader';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input, Pagination, Radio } from 'antd';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Data from '@/data/Data';
import Link from 'next/link'
import axios from 'axios';
import Loader from '../../components/Loader';


const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('brands');
  const [programs, setPrograms] = useState(null);
  const [filteredPrograms, setFilteredPrograms] = useState(null);

  const [loading, setLoading] = useState(true);

  const pageSize = 10; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentItems = filteredPrograms && filteredPrograms.slice(startIndex, endIndex);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/get_CoreData", { key: "Vx0cbjkzfQpyTObY8vfqgN1us" });
        setPrograms(response.data.programs);
        setLoading(false);

      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if(searchText !== ''){
      try {
        const response = await axios.post("/api/search_mcqs", { key: "Vx0cbjkzfQpyTObY8vfqgN1us", wordSearch: searchText.toLowerCase() });
        setFilteredPrograms(response.data.mcqs);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    }
    fetchData();
  }, [searchText, programs]);

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


  return (
    <>
      {loading ? (
        <div style={{ width: "100%", height: "600px", display: "flex", justifyContent: "center", alignItems: "center", }}>


          <Loader />
        </div>
      ) : (
        <div>
          <WebHeader />
          <main className="w-full flex items-center justify-center">
            <div className="p-6 w-full max-w-screen-lg py-10">

              <div className="flex flex-col items-center mb-4">
                <div className="relative flex items-center mb-4 w-full max-w-[600px] ">
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
                      value="brands"
                      className={selectedRadio === 'brands' ? 'red-radio ' : ''}
                    >
                      Brands
                    </Radio>
                    <Radio
                      value="generics"
                      className={selectedRadio === 'generics' ? 'red-radio' : ''}
                    >
                      Generics
                    </Radio>
                    <Radio
                      value="companies"
                      className={selectedRadio === 'companies' ? 'red-radio' : ''}
                    >
                      Companies
                    </Radio>
                  </Radio.Group>
                </div>
              </div>
              {!searchText &&  <div className="my-6 flex justify-center flex-wrap ">
                   {programs && programs.map((item, index) => (
                  <Link
                    key={index}
                    href={`/items/${encodeURIComponent(item.name)}?options=${encodeURIComponent(item.id)}&program_id=${item.id}`}
                  >
                    <div
                      key={item.name}
                      style={{
                        width: "200px", // Set a fixed width
                        height: "80px", // Set a fixed height
                        fontSize: "30px", // Increase the font size
                        backgroundColor: item.tag_bg_color,
                        color: item.tag_text_color,
                        margin: "10px",
                      }}
                      className="uppercase hover:scale-105 transition-transform shadow-md hover:shadow-lg cursor-pointer font-[700] flex items-center justify-center py-8 px-8 text-white rounded-md"
                    >
                      {item.name}
                    </div>
                  </Link>
                ))}
              </div>
            }
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
          <div className="text-black  flex justify-center items-center md:space-x-6 " style={{ width: "72%" }}>
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
            <Pagination defaultCurrent={1} onChange={handlePageChange} total={filteredPrograms && filteredPrograms?.length}/>
              
            </div>
          </main>
          <WebFooter />
        </div>
        )}</>

  );
};

export default Home;