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

const Subject = () => {

const router = useRouter();
//   const { options } = router.query; 
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [selectedData, setSelectedData] = useState({});
const [selectedRadio, setSelectedRadio] = useState('Speciality wise');
  const [optionName, setOptionName] = useState('');
  const [subjects, setSubjects] = useState([
    {
        name: "Paediatrics",
        content: "500 Mcqs Covering Denstisty",
        bg: "#96D4D4",
        img: "/images/paper.svg",
    },
    {
        name: "Medicines",
        content: "500 Mcqs Covering Denstisty",
        bg: "#D9EEE1",
        img: "/images/paper.svg",
    },
    {
        name: "Surgery & Allied",
        content: "500 Mcqs Covering Denstisty",
        bg: "#FFC0C7",
        img: "/images/paper.svg",
    },
    {
        name: "Dentistry",
        content: "500 Mcqs Covering Denstisty",
        bg: "#FFC0C7",
        img: "/images/paper.svg",
    },
    {
        name: "Opthalmplogy",
        content: "500 Mcqs Covering Denstisty",
        bg: "#EFE59D9E",
        img: "/images/paper.svg",
    },
    {
        name: "Neuroscience",
        content: "500 Mcqs Covering Denstisty",
        bg: "#F3ECEA",
        img: "/images/paper.svg",
    },
    {
        name: "ENT",
        content: "500 Mcqs Covering Denstisty",
        bg: "#D9EEE1",
        img: "/images/paper.svg",
    },
    {
        name: "Obs & Gyane",
        content: "500 Mcqs Covering Denstisty",
        bg: "#FFC0C7",
        img: "/images/paper.svg",
    },
    {
        name: "Anesthesia",
        content: "500 Mcqs Covering Denstisty",
        bg: "#F3ECEA",
        img: "/images/paper.svg",
    },
    {
        name: "Radiology",
        content: "500 Mcqs Covering Denstisty",
        bg: "#EFE59D9E",
        img: "/images/paper.svg",
    },
    {
        name: "Pathalogy",
        content: "500 Mcqs Covering Denstisty",
        bg: "#F3ECEA",
        img: "/images/paper.svg",
    },
    {
        name: "Community Medicine",
        content: "500 Mcqs Covering Denstisty",
        bg: "#96D4D4",
        img: "/images/paper.svg",
    },
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
      <div className="text-center flex flex-col justify-center w-full">
                        <h1 className="font-[700] text-[32px]">Select Past Paper</h1>
                        <div className="flex justify-center space-x-4 my-4">
            <Radio.Group onChange={handleRadioChange}  value={selectedRadio}>
              <Radio
                value="Speciality wise"
                className={selectedRadio === 'Speciality wise' ? 'red-radio text-[#043B6282]' : 'text-[#043B6282]'}
              >
                Speciality wise
              </Radio>
              <Radio
                value="Date Wise"
                className={selectedRadio === 'Date Wise' ? 'red-radio text-[#043B6282]' : 'text-[#043B6282]'}
              >
                Date Wise
              </Radio>
            </Radio.Group>
          </div>
                    </div>

          <div className="my-[3rem]   flex justify-center w-full   flex-wrap px-6">
            
            {subjects.map((subject, index) => (
  <SubjectCard 
    key={index}
    subject={subject}
    link ={`/items/name/papers/paper?index=${index}`}
  />
))}
      </div>
      </main>
      <WebFooter />
    </div>
  );
};

export default Subject