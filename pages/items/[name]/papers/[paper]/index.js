import WebFooter from '@/components/WebFooter';
import WebHeader from '@/components/WebHeader';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Input, Radio } from 'antd';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import {useRouter} from 'next/router'
import Data from '@/data/Data'; 
import SubjectCard from '@/components/SubjectCard';
import React from 'react';
import Link from 'next/link'
import axios from 'axios';
const Paper = () => {

const router = useRouter();


const [papers, setPapers] = useState(null)

useEffect((e) => {
    const getData = async () => {
        try {
            const response = await axios.post('/api/get_past_paper/Medicine', { key: 'Vx0cbjkzfQpyTObY8vfqgN1us' ,program_id:1})
            if(response.data.error===false){
                setPapers(response.data.papers)
            }
           
        } catch (error) {
            console.log(error)
        }

    }
    getData();
}, [])

  const [pastPaper, setPastPaper] = useState([
   "Med 25 May 2023 (M)",
   "Med 25 May 2023 (M)",
   "Med 25 May 2023 (M)",
   "Med 25 May 2023 (M)",
   "Med 25 May 2023 (M)",
   "Med 25 May 2023 (M)",
   "Med 25 May 2023 (M)",
   "Med 25 May 2023 (M)",
   "Med 25 May 2023 (M)",
   "Med 25 May 2023 (M)",
   "Med 25 May 2023 (M)",
   "Med 25 May 2023 (M)",
   "Med 25 May 2023 (M)",
   "Med 25 May 2023 (M)",
   "Med 25 May 2023 (M)",
   "Med 25 May 2023 (M)"
  ])

//   const findOptionsByName = (name) => {
//     const foundOptions = Data.find((item) => item.name === name);
//     if (foundOptions) {
//       setSelectedData(foundOptions)
//       setSelectedOptions(foundOptions.options);
//     } else {
//       setSelectedOptions([]);
//       setSelectedData({}); 
//     }
//   };

//   console.log(optionName)

//   useEffect(() => {

//     if (options) {
//       const parsedOptions = JSON.parse(options);
//       findOptionsByName(parsedOptions);
    
//     }
//   });

const handleRadioChange = (e) => {
    setSelectedRadio(e.target.value);
  };



  return (
    <div className="">
       <WebHeader />
      <main className="my-[6rem] w-full h-full xxl:h-[100vh] flex flex-col items-center  xl:justify-start">
      <div className="text-center w-full">
            <h1 className="font-[700] text-[32px]">Select Past Paper</h1>
        </div>
        <div className="my-[3rem] flex justify-center w-full   flex-wrap px-6">
        
            {papers&&papers.map((paper, index) => (
                <div key={index} className="my-[.5rem] mx-[3rem] bg-[#96D4D4] py-2 px-7 rounded-md" >
                    <p className='font-[500] text-[18px]'>{paper.custom_name}</p>
                </div>
            ))}
         
      </div>
      </main>
      <WebFooter />
    </div>
  );
};

export default Paper