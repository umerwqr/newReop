import WebFooter from '@/components/WebFooter';
import WebHeader from '@/components/WebHeader';
import { useState } from 'react';
import { Input, Radio } from 'antd';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Data from '@/data/Data'
import Link from 'next/link'
const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('brands');


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
    <div>
      <WebHeader />
      <main className="w-full h-[100vh] flex items-center justify-center">
        <div className=" p-6  w-[600px]">
            <div>
          <div className="relative flex items-center justify-between mb-4">
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
          <div className="my-[6rem] flex justify-center space-x-4 w-full">
            {Data.map((item, index) => (
               <Link
               key={index}
               href={`/items/${encodeURIComponent(item.name)}?options=${encodeURIComponent(JSON.stringify(item.name))}`}
              //  as={`/items/${item.name}?options=${encodeURIComponent(JSON.stringify(item.name))}`}
             >
              <div
                key={item.name}
                style={{ backgroundColor: item.bg }}
                className={`uppercase cursor-pointer text-[48px] font-[700] w-full  flex items-center justify-center py-8 px-8 text-white rounded-md bg-[${item.bg}]`}
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
  );
};

export default Home;
