import WebFooter from '@/components/WebFooter';
import WebHeader from '@/components/WebHeader';
import { useEffect, useState } from 'react';
import { Input, Radio } from 'antd';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Data from '@/data/Data';
import Link from 'next/link'
import axios from 'axios';
const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('brands');
const [programs,setPrograms]=useState(null);

console.log(programs)
  useEffect((e)=>{
    const Data=async()=>{
      try{
          const response= await axios.post("/api/get_Core_Data",{key:"Vx0cbjkzfQpyTObY8vfqgN1us"})
          console.log(response.data.programs.name);
          setPrograms(response.data.programs);

      }catch(error){
           console.log(error)
      }

    }
    Data();
  },[])
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
      <main className="w-full flex items-center justify-center">
        <div className=" p-6  w-[1200px]">
            <div  style={{display:"flex",justifyContent:"center", flexDirection:"column",alignItems:"center",marginTop:"100px"}}>
          <div className="relative flex items-center  mb-4 w-[600px] ">
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
          <div className="my-[6rem] flex justify-center space-x-4 flex-wrap">
            {programs && programs.map((item, index) => (
               <Link
               key={index}
               href={`/items/${encodeURIComponent(item.name)}?options=${encodeURIComponent(JSON.stringify(item.name))}`}
              //  as={`/items/${item.name}?options=${encodeURIComponent(JSON.stringify(item.name))}`}
             >
              <div
                key={item.name}
                style={{ backgroundColor: item.tag_bg_color ,display:"flex",width:"250px",color:item.tag_text_color, margin:"10px"}}
                className={`uppercase cursor-pointer text-[48px] font-[700]  flex flex-wrap items-center justify-center py-8 px-8 text-white rounded-md bg-[${item.tag_bg_color}]`}
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
