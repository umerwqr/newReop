import WebFooter from '@/components/WebFooter';
import WebHeader from '@/components/WebHeader';
import {useState, useEffect} from 'react';
import Image from 'next/image';
import {Input, Radio} from 'antd';
import {SearchOutlined, CloseCircleOutlined} from '@ant-design/icons';
import {useRouter} from 'next/router'
import Data from '@/data/Data';
import GuideCard from '@/components/GuideCard';
import React from 'react';

const Guide = () => {

    // const router2 = useRouter();
    // const {index, optionName, selectedData} = router2.query;
    // const [selectedDataObj, setSelectedDataObj] = useState({});
    // const [isLoading, setIsLoading] = useState(false);

    const [guideData, setGuideData] = useState([
        {
           name: "Dr. James Williams",
           post: "12 Aug 2023",
           info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
           img: '/images/guide/guide1.svg',

       },
       {
           name: "Dr. James Williams",
           post: "12 Aug 2023",
           info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
           img: '/images/guide/guide2.svg',

       },
       {
           name: "Dr. James Williams",
           post: "12 Aug 2023",
           info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
           img: '/images/guide/guide3.svg',

       },
       {
           name: "Dr. James Williams",
           post: "12 Aug 2023",
           info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
           img: '/images/guide/guide4.svg',

       },
       {
           name: "Dr. James Williams",
           post: "12 Aug 2023",
           info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
           img: '/images/guide/guide5.svg',

       },
       {
           name: "Dr. James Williams",
           post: "12 Aug 2023",
           info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
           img: '/images/guide/guide6.svg',

       },
       {
           name: "Dr. James Williams",
           post: "12 Aug 2023",
           info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
           img: '/images/guide/guide7.svg',

       },
       {
           name: "Dr. James Williams",
           post: "12 Aug 2023",
           info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
           img: '/images/guide/guide8.svg',

       },
       {
           name: "Dr. James Williams",
           post: "12 Aug 2023",
           info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
           img: '/images/guide/guide9.svg',

       },
       {
           name: "Dr. James Williams",
           post: "12 Aug 2023",
           info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
           img: '/images/guide/guide10.svg',

       },
       {
           name: "Dr. James Williams",
           post: "12 Aug 2023",
           info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
           img: '/images/guide/guide11.svg',

       },
       {
           name: "Dr. James Williams",
           post: "12 Aug 2023",
           info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
           img: '/images/guide/guide12.svg',

       },
   ])


    // useEffect(() => {
    //     console.log('[Guide].js')
    //     if (index) {
    //         try {
    //             const parsedSelectedData = JSON.parse(decodeURIComponent(selectedData));
    //             setSelectedDataObj(parsedSelectedData);
    //             setIsLoading(false);
    //         } catch (error) {
    //             console.error('Error parsing selectedData:', error);
    //         }
    //     }
    // }, [index, optionName, selectedData]);

    // if (isLoading === true) {
    //     return <div>Loading...</div>
    // }

    return (
        <div>
            <WebHeader/>
            <main className="w-full h-full flex items-center justify-center">
                <div className=" py-[6rem] px-2 sm:px-4 flex flex-col items-center">
                    <div className="text-center">
                        <h1 className="font-[700] text-[32px]">Guidlines</h1>
                        <p className="text-[#777777]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                    </div>
                    <div className="my-[3rem] h-full  w-full grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
  {guideData.map((guide, index) => (
    <GuideCard key={index} guide={guide}  />
  ))}
</div>

                </div>
            </main>
            <WebFooter/>
        </div>
    );
};

export default Guide;
