import WebFooter from '@/components/WebFooter';
import WebHeader from '@/components/WebHeader';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Input, Radio, message } from 'antd';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'
import Data from '@/data/Data';
import GuideCard from '@/components/GuideCard';
import React from 'react';
import axios from 'axios';

const Cards = () => {

    const router = useRouter();
    const{ sliderValue, subject}=router.query

    const [subjectObject, setSubjectObject] = useState(subject ? JSON.parse(subject) : null)
    console.log(subject.unit_id, "  and  ",subject.subject_id ," and ",subject.unit_id,"   and  ", sliderValue)


    useEffect(()=>{


    },[])
    // const {index, optionName, selectedData} = router2.query;
    // const [selectedDataObj, setSelectedDataObj] = useState({});
    // const [isLoading, setIsLoading] = useState(false);


    const [data, setData] = useState(null)
   console.log("daaaaattttaaaa",data)

    useEffect((e) => {
        const getData = async () => {
            try {
                const response = await axios.post('/api/get_flash_cards', { key: 'Vx0cbjkzfQpyTObY8vfqgN1us', unit_id:subjectObject?.unit_id, program_id:subjectObject?.program_id, subject_id:subjectObject?.subject_id })
                console.log(response)
                if (response.data.error === false) {
                    setData(response.data.slides)
                }

            } catch (error) {
                message.error("Error")
                console.log(error)
            }

        }
        getData();
    }, [])





    return (
        <div>
            <WebHeader />
            <main className="w-full h-full flex items-center justify-center">
                <div className=" py-[6rem] px-2 sm:px-4 flex flex-col items-center">
                    <div className="text-center">
                        <h1 className="font-[700] text-[32px]">FLash Cards</h1>
                        <p className="text-[#777777] w-60">The Best Flash Cards of the selected Unit are following</p>
                    </div>
                    <div className="my-[3rem] h-full  w-full grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                        {data && data.map((guide, index) => (
                            <GuideCard key={index} guide={guide} question={guide.question} />
                        ))}
                    </div>

                </div>
            </main>
            <WebFooter />
        </div>
    );
};

export default Cards;
