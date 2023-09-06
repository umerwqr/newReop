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
  const [optionName, setOptionName] = useState('');
  const [subjects, setSubjects] = useState([
    {
        name: "Dentistry",
        content: "500 Mcqs Covering Denstisty",
        bg: "#96D4D4",
        img: "/images/subject/dentist.svg",
    },
    {
        name: "Physiology",
        content: "500 Mcqs Covering Denstisty",
        bg: "#D9EEE1",
        img: "/images/subject/img2.svg",
    },
    {
        name: "Gross Anatomy",
        content: "500 Mcqs Covering Denstisty",
        bg: "#FFC0C7",
        img: "/images/subject/img3.svg",
    },
    {
        name: "Special Pathalogy",
        content: "500 Mcqs Covering Denstisty",
        bg: "#FFC0C7",
        img: "/images/subject/img4.svg",
    },
    {
        name: "Gen Pathalogy",
        content: "500 Mcqs Covering Denstisty",
        bg: "#EFE59D9E",
        img: "/images/subject/img5.svg",
    },
    {
        name: "Neuroscience",
        content: "500 Mcqs Covering Denstisty",
        bg: "#F3ECEA",
        img: "/images/subject/img6.svg",
    },
    {
        name: "Gen. Pharmacology",
        content: "500 Mcqs Covering Denstisty",
        bg: "#D9EEE1",
        img: "/images/subject/img7.svg",
    },
    {
        name: "Microbiology",
        content: "500 Mcqs Covering Denstisty",
        bg: "#FFC0C7",
        img: "/images/subject/img8.svg",
    },
    {
        name: "Biochemistry",
        content: "500 Mcqs Covering Denstisty",
        bg: "#F3ECEA",
        img: "/images/subject/img2.svg",
    },
    {
        name: "Medicines",
        content: "500 Mcqs Covering Denstisty",
        bg: "#EFE59D9E",
        img: "/images/subject/img2.svg",
    },
    {
        name: "Embryology",
        content: "500 Mcqs Covering Denstisty",
        bg: "#F3ECEA",
        img: "/images/subject/img3.svg",
    },
    {
        name: "Gen. Surgery",
        content: "500 Mcqs Covering Denstisty",
        bg: "#96D4D4",
        img: "/images/subject/img4.svg",
    },
    {
        name: "Sp. Surgery",
        content: "500 Mcqs Covering Denstisty",
        bg: "#F3ECEA",
        img: "/images/subject/img4.svg",
    },
    {
        name: "Paediatrics",
        content: "500 Mcqs Covering Denstisty",
        bg: "#EFE59D9E",
        img: "/images/subject/img6.svg",
    },
    {
        name: "Histology",
        content: "500 Mcqs Covering Denstisty",
        bg: "#F3ECEA",
        img: "/images/subject/img7.svg",
    },
    {
        name: "Biostate",
        content: "500 Mcqs Covering Denstisty",
        bg: "#96D4D4",
        img: "/images/subject/img2.svg",
    },
    {
        name: "Gen Anatomy",
        content: "500 Mcqs Covering Denstisty",
        bg: "#F3ECEA",
        img: "/images/subject/img2.svg",
    },
    {
        name: "Behavioral science",
        content: "500 Mcqs Covering Denstisty",
        bg: "#EFE59D9E",
        img: "/images/subject/img2.svg",
    },
    {
        name: "Behavioral science",
        content: "500 Mcqs Covering Denstisty",
        bg: "#EFE59D9E",
        img: "/images/subject/img3.svg",
    },
    {
        name: "Opthalmology",
        content: "500 Mcqs Covering Denstisty",
        bg: "#F3ECEA",
        img: "/images/subject/img3.svg",
    },
    {
        name: "Gynae",
        content: "500 Mcqs Covering Denstisty",
        bg: "#96D4D4",
        img: "/images/subject/img5.svg",
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


  return (
    <div className="">
       <WebHeader />
      <main className="my-[6rem] w-full h-full xxl:h-[100vh] flex flex-col items-center  xl:justify-start">
      <div className="text-center w-full">
                        <h1 className="font-[700] text-[32px]">Select Subject</h1>
                    </div>

          <div className="my-[3rem]   flex justify-center w-full   flex-wrap px-6">
            
            {subjects.map((subject, index) => (
  <SubjectCard 
    key={index}
    subject={subject}
    link = {`/items/name/mcqs/unit?index=${index}`}
  />
))}
      </div>
      </main>
      <WebFooter />
    </div>
  );
};

export default Subject