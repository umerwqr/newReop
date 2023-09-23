import WebFooter from '@/components/WebFooter';
import WebHeader from '@/components/WebHeader';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Input, Radio } from 'antd';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'
import Data from '@/data/Data';
import SubjectCard from '@/components/SubjectCard';
import React from 'react';
import Link from 'next/link'
import axios from 'axios';
import { Slider } from 'antd';
import Loader from '@/components/Loader';
export default function Unit() {

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { subject, program_id } = router.query;

  const subjectObject = subject ? JSON.parse(subject) : null;

  const [mcqsData, setMcqsData] = useState(null)

  const unitClicked = (index, sId, uId, name, pId) => {
    setIsSelected(index)
    setMcqsData({ subject_id: sId, unit_id: uId, name: name, program_id: pId })


  }
  console.log("mcq Data ", mcqsData)


  const [isSelected, setIsSelected] = useState(-1);

  const [sliderValue, setSliderValue] = React.useState(0);

  console.log(sliderValue)
  const handleSliderChange = (value) => {
    setSliderValue(value);
  };
  const [sliderValue2, setSliderValue2] = React.useState(0);

  console.log(sliderValue2)
  const handleSliderChange2 = (value) => {
    setSliderValue2(value);
  };




  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.value);
  };


  return (
    <>
      {loading ? (
        <div style={{ width: "100%", height: "600px", display: "flex", justifyContent: "center", alignItems: "center", }}>


          <Loader />
        </div>
      ) : (
        <div className="">
          <WebHeader />
          <main className="my-[6rem] w-full h-full xxl:h-[100vh] flex flex-col items-center  xl:justify-start">
            <div className="text-center w-full">
              <h1 className="font-[700] text-[32px]">Select Unit</h1>
            </div>
            <div className="my-[3rem] md:px-[6rem] lg:px-[15rem] w-full flex-wrap px-6 grid grid-cols-1 md:grid-cols-2 gap-3">

              {subjectObject?.units?.map((each, index) => (

                <div

                  key={index}
                  className={`cursor-pointer text-center my-[.5rem] py-5 w-full  mx-auto md:mx-0 ${isSelected === index ? 'bg-[#D7392B]' : 'bg-[#1F5689]'
                    } py-2 px-7 rounded-lg`}
                  onClick={() => unitClicked(index, each.subject_id, each.id, each.name, program_id)}
                >


                  <p className={`font-[600] text-[24px] text-white`}

                  >{each.name}

                  </p>

                </div>
              ))}
            </div>
            <div className="w-full px-[2rem] md:px-[6rem] lg:px-[15rem] ">
              <div className="bg-[#3F93FF12] text-black  border border-[#3F93FF2B] px-4 py-3 rounded-md w-full font-[500] text-[20px]">{sliderValue} MCQs of {mcqsData?.name} unit in {sliderValue2} minutes</div>
              <div className="w-full my-3">
                <h1 className="font-[500] text-[20px] text-center mb-2">Total Questions</h1>
                <div className="rounded-full bg-[#D7392B] py-[10px] w-full"></div>
                <div className="w-full flex justify-between my-1"><span className="font-[500] text-[20px]">0</span><span className="font-[500] text-[20px]">200</span></div>
                <Slider
                  min={0}
                  max={200}
                  value={sliderValue}
                  onChange={handleSliderChange}

                />
              </div>
              <div className="w-full my-3">
                <h1 className="font-[500] text-[20px] text-center mb-2">Total Time</h1>
                <div className="rounded-full bg-[#D7392B] py-[10px] w-full"></div>
                <div className="w-full flex justify-between my-1"><span className="font-[500] text-[20px]">0</span><span className="font-[500] text-[20px]">60</span></div>
                <Slider
                  min={0}
                  max={60}
                  value={sliderValue2}
                  onChange={handleSliderChange2}

                />
              </div>


            </div>

            <Link href={{ pathname: `/items/name/mcqs/unit/quiz.js?`, query: { subject: JSON.stringify(mcqsData), sliderValue, sliderValue2 } }} >
              <button disabled={isSelected === -1 || sliderValue === 0 || sliderValue2 === 0} className={`mt-8 border p-4 rounded ${isSelected === -1 || sliderValue === 0 || sliderValue2 === 0 ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-blue-900 text-white hover:bg-blue-800 hover:text-white hover:scale-105 transition-transform hover:shadow-lg'}`}
              > Start Test</button>

            </Link>
          </main>
          <WebFooter />
        </div>)}</>
  );
};

