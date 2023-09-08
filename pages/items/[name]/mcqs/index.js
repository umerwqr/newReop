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

const Subject = () => {


    const [data, setData] = useState(null)

    useEffect((e) => {
        const getData = async () => {
            try {
                const response = await axios.post('/api/getMcqs', { key: 'Vx0cbjkzfQpyTObY8vfqgN1us' })
                if(response.data.error===false){
                    setData(response.data.subjects)
                }
               
            } catch (error) {
                console.log(error)
            }

        }
        getData();
    }, [])

    const router = useRouter();
    //   const { options } = router.query; 
    //   const [selectedOptions, setSelectedOptions] = useState([]);
    //   const [selectedData, setSelectedData] = useState({});
    const [optionName, setOptionName] = useState('');
   

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

                    {data && data.map((subject, index) => (
                        <SubjectCard
                            key={index}
                            subject={subject}
                            link={`/items/name/mcqs/unit?index=${index}`}
                        />
                    ))}
                </div>
            </main>
            <WebFooter />
        </div>
    );
};

export default Subject