import WebFooter from '@/components/WebFooter';
import WebHeader from '@/components/WebHeader';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input, Radio } from 'antd';
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
    if (programs) {
      setFilteredPrograms(programs.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase())));
    }
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

  return (
    <>
    {loading ? (
      <div style={{width:"100%",height:"600px",display:"flex",justifyContent:"center",alignItems:"center",}}>

      
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

          <div className="my-6 flex justify-center flex-wrap ">
            {filteredPrograms && filteredPrograms.map((item, index) => (
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
        </div>
      </main>
      <WebFooter />
    </div>
    )}
    </>
  );
};

export default Home;