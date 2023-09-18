import WebFooter from '@/components/WebFooter';
import WebHeader from '@/components/WebHeader';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Input, Radio } from 'antd';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'
import Data from '@/data/Data';
import SubjectCard from '@/components/SubjectCard';
import Loader from '@/components/Loader';
import React from 'react';
import Link from 'next/link'
import axios from 'axios';
import PpMedicine from '@/components/PpMedicine';

const Subject = () => {

  //   const { options } = router.query; 
  //   const [selectedOptions, setSelectedOptions] = useState([]);
  //   const [selectedData, setSelectedData] = useState({});

  const router = useRouter();
  const { program_id } = router.query;

  const [data, setData] = useState(null)

  const [loading, setLoading] = useState(true);

  useEffect((e) => {
    const getData = async () => {
      try {
        const response = await axios.post('/api/subjects_units', { key: 'Vx0cbjkzfQpyTObY8vfqgN1us' })
        setLoading(false)
        if (response) {

          setData(response.data.subjects)

        }

      } catch (error) {
        console.log(error)
      }

    }
    getData();
  }, [2])


  const [selectedRadio, setSelectedRadio] = useState('Speciality wise');
  const [optionName, setOptionName] = useState('');


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
            <div className="text-center flex flex-col justify-center w-full">
              <h1 className="font-[700] text-[32px]">Select Past Paper</h1>
              <div className="flex justify-center space-x-4 my-4">
                <Radio.Group onChange={handleRadioChange} value={selectedRadio}>
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

              {data && data.map((subject, index) => (
                <SubjectCard
                  key={index}
                  subject={subject}
                  link={`/items/name/papers/paper?index=${index}`}
                />
              ))}
            </div>
          </main>
          <WebFooter />
        </div>)}</>
  );
};

export default Subject