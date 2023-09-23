import WebFooter from '@/components/WebFooter';
import WebHeader from '@/components/WebHeader';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Input, Radio } from 'antd';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'
import axios from 'axios';
import Data from '@/data/Data';
import SubjectCard from '@/components/SubjectCard';
import React from 'react';
import Link from 'next/link'
import Loader from '@/components/Loader';


const Subject = () => {

    const router = useRouter();
    //   const { options } = router.query; 
    //   const [selectedOptions, setSelectedOptions] = useState([]);
    //   const [selectedData, setSelectedData] = useState({});

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
    }, [])

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
                            <h1 className="font-[700] text-[32px]">Select Subject</h1>
                        </div>

                        <div className="my-[3rem]   flex justify-center w-full   flex-wrap px-6">

                            {data && data.map((subject, index) => (
                                <SubjectCard
                                    key={index}
                                    subject={subject}
                                    url={subject.image_url}
                                    name={subject.name}
                                    
                                    link=''
                                />
                            ))}
                        </div>
                    </main>
                    <WebFooter />
                </div>)}</>
    );
};

export default Subject