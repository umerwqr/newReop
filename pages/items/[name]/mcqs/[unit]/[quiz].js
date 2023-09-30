import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import WebFooter from '@/components/WebFooter'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios';
import { useRouter } from 'next/router';
import Loader from '@/components/Loader';
import cookie from "js-cookie"
import NotesCard from "@/components/NotesCard"
import Bookmark from '@/components/Bookmark';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'; // Import other icons
import WebHeader from '@/components/WebHeader';

const BookmarkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <path d="M12 2l-4.95 4.95-4.95-4.95M6.05 0v16.35l5.95 5.95 5.95-5.95V0H6.05z" />
  </svg>
);

const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);
const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);
const CancelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const HelpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -1.7 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <circle cx="12" cy="12" r="12.7" />
    <text x="12" y="20" textAnchor="middle" width="12" height="12" fontSize="18" fontWeight="bold">?</text>
  </svg>
);

export default function Quiz() {

  const [loading, setLoading] = useState(true);
  const userCookie = cookie.get("user")

  const [userObject, setUserObject] = useState(null)
  console.log("iiuuuuuu", userObject && userObject, " end")
  useEffect(() => {
    if (userCookie) {
      setUserObject(JSON.parse(userCookie))

    }
  }, [userCookie]);

  const router = useRouter();
  const { subject, sliderValue, sliderValue2 } = router.query;

  const [subjectObject, setSubjectObject] = useState(subject ? JSON.parse(subject) : null)

  console.log(" subject Object ", subjectObject, "   and  ", sliderValue)


  const [mcqs, setMcqs] = useState(null);
  console.log("mcsssqs", mcqs)
  const [len, SetLen] = useState(1);

  const [question, setQuestion] = useState();
  const [eachMcq, setEachMcq] = useState(null);
  const [check, setCheck] = useState(true);
  const [totalQuestion, setTotalQuestion] = useState(null)

  const handleEachMcq = () => {
    if ((mcqs ? (sliderValue > mcqs.length ? mcqs.length : sliderValue) : null) > i) {

      setAanswer(null)
      setBanswer(null)
      setCanswer(null)
      setDanswer(null)
      setEanswer(null)
      setIsASelected(null)
      setIsBSelected(null)
      setIsCSelected(null)
      setIsDSelected(null)
      setIsESelected(null)

      setEachMcq(mcqs && mcqs[i])
      setI(i + 1)
    }
    else {
      setCheck(false)

    }
  }
  const [i, setI] = useState(1)

  var response = null;

  useEffect(() => {
    const getData = async () => {
      try {
        if (subjectObject.unit_id && subjectObject.program_id && subjectObject.subject_id) {
          const response = await axios.post('/api/get_mcqs', { key: 'Vx0cbjkzfQpyTObY8vfqgN1us', topic_id: subjectObject.topic_id ? subjectObject.topic_id : "", unit_id: subjectObject.unit_id, program_id: subjectObject.program_id, subject_id: subjectObject.subject_id })
          setMcqs(response.data.mcqs)
        } else {
          const response = await axios.post('/api/get_mcqs', { key: 'Vx0cbjkzfQpyTObY8vfqgN1us', unit_id: subjectObject.unit_id, subject_id: subjectObject.subject_id })
          setMcqs(response.data.mcqs)
        }
        setLoading(false);
      } catch (error) {
        console.log("Error:", error);
        setLoading(false);
      }
    }
    if (subjectObject) {
      getData();
    }
  }, [subjectObject]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(mcqs && mcqs.length).fill(''));

  const [timer, setTimer] = useState(sliderValue2 * 60); // 10 minutes in seconds
  const [minutes, setMinutes] = useState(sliderValue2); // 30 minutes in seconds

  // Effect to handle the timer
  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
        setMinutes(Math.floor(timer / 60));

      } else {
        clearInterval(timerInterval);

        message.error("Time's Up!");
        setCheck(false)

      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timer]);
  const handleOptionClick = (selectedOption) => {
    if (isTimeUp || userAnswers[currentQuestionIndex] !== '') {
      // Prevent answering after time's up or if already answered
      return;
    }

    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedOption;
    setUserAnswers(newAnswers);
  };


  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const [skip, setSkip] = useState(0)
  const handleSkip = () => {

    if ((mcqs ? (sliderValue > mcqs.length ? mcqs.length : sliderValue) : null) > i) {


      setSkip(skip + 1)
      setAanswer(null)
      setBanswer(null)
      setCanswer(null)
      setDanswer(null)
      setEanswer(null)

      setIsASelected(null)
      setIsBSelected(null)
      setIsCSelected(null)
      setIsDSelected(null)
      setIsESelected(null)
      setEachMcq(mcqs && mcqs[i + 1])
      setI(i + 1)

    }
    else {
      setCheck(false)

    }

  }

  const skippedQuestions = userAnswers.filter((answer) => answer === 'skipped').length;
  const totalQuestions = mcqs && mcqs.length;


  const [isASelected, setIsASelected] = useState(false)
  const [isBSelected, setIsBSelected] = useState(false)
  const [isCSelected, setIsCSelected] = useState(false)
  const [isDSelected, setIsDSelected] = useState(false)
  const [isESelected, setIsESelected] = useState(false)

  const handleSelectA = () => {
    setASelected(true)
    setBSelected(false)
    setCSelected(false)
    setDSelected(false)
    setESelected(false)

  }
  const handleSelectB = () => {
    setASelected(false)
    setBSelected(true)
    setCSelected(false)
    setDSelected(false)
    setESelected(false)


  }
  const handleSelectC = () => {
    setASelected(false)
    setBSelected(false)
    setCSelected(true)
    setDSelected(false)
    setESelected(false)

  }
  const handleSelectD = () => {
    setASelected(false)
    setBSelected(false)
    setCSelected(false)
    setDSelected(true)
    setESelected(false)

  }
  const [isAanswer, setAanswer] = useState(null);
  const [isBanswer, setBanswer] = useState(null);
  const [isCanswer, setCanswer] = useState(null);
  const [isDanswer, setDanswer] = useState(null);
  const [isEanswer, setEanswer] = useState(null);



  const handleSelect = (option) => {
    // Check if user has already selected an option, or if the time is up
    if (eachMcq && eachMcq.mcq1 === eachMcq.answer || eachMcq === null && mcqs && mcqs[0].mcq1 === mcqs[0].answer) {

      setAanswer(eachMcq && eachMcq.mcq1 || eachMcq === null && mcqs && mcqs[0].mcq1)
      setBanswer(null)
      setCanswer(null)
      setDanswer(null)
      setEanswer(null)


    }
    else if (eachMcq && eachMcq.mcq2 === eachMcq.answer || eachMcq === null && mcqs && mcqs[0].mcq2 === mcqs[0].answer) {

      setBanswer(eachMcq && eachMcq.mcq2 || eachMcq === null && mcqs && mcqs[0].mcq2)
      setAanswer(null)
      setCanswer(null)
      setDanswer(null)
      setEanswer(null)


    }
    else if (eachMcq && eachMcq.mcq3 === eachMcq.answer || eachMcq === null && mcqs && mcqs[0].mcq3 === mcqs[0].answer) {

      setCanswer(eachMcq && eachMcq.mcq3 || eachMcq === null && mcqs && mcqs[0].mcq3)
      setBanswer(null)
      setAanswer(null)
      setDanswer(null)
      setEanswer(null)

    }
    else if (eachMcq && eachMcq.mcq4 === eachMcq.answer || eachMcq === null && mcqs && mcqs[0].mcq4 === mcqs[0].answer) {

      setDanswer(eachMcq && eachMcq.mcq4 || eachMcq === null && mcqs && mcqs[0].mcq4)
      setBanswer(null)
      setCanswer(null)
      setAanswer(null)
      setEanswer(null)
    }
    else if (eachMcq && eachMcq.mcq5 === eachMcq.answer || eachMcq === null && mcqs && mcqs[0].mcq5 === mcqs[0].answer) {

      setEanswer(eachMcq && eachMcq.mcq5 || eachMcq === null && mcqs && mcqs[0].mcq5)
      setBanswer(null)
      setCanswer(null)
      setAanswer(null)
      setDanswer(null)
    }
    if (
      isASelected ||
      isBSelected ||
      isCSelected ||
      isDSelected ||
      isESelected ||
      userAnswers[currentQuestionIndex] !== ''
    ) {
      return;
    }

    switch (option) {
      case 1:
        setIsASelected(true);
        break;
      case 2:
        setIsBSelected(true);
        break;
      case 3:
        setIsCSelected(true);
        break;
      case 4:
        setIsDSelected(true);
        break;
      case 5:
        setIsESelected(true);
        break;
      default:
        break;
    }
  };
  const handleAnswer = () => {
    if (eachMcq && eachMcq.mcq1 === eachMcq.answer || eachMcq === null && mcqs && mcqs[0].mcq1 === mcqs[0].answer) {

      setAanswer(eachMcq && eachMcq.mcq1 || eachMcq === null && mcqs && mcqs[0].mcq1)
      setBanswer(null)
      setCanswer(null)
      setDanswer(null)
      setEanswer(null)


    }
    else if (eachMcq && eachMcq.mcq2 === eachMcq.answer || eachMcq === null && mcqs && mcqs[0].mcq2 === mcqs[0].answer) {

      setBanswer(eachMcq && eachMcq.mcq2 || eachMcq === null && mcqs && mcqs[0].mcq2)
      setAanswer(null)
      setCanswer(null)
      setDanswer(null)
      setEanswer(null)

    }
    else if (eachMcq && eachMcq.mcq3 === eachMcq.answer || eachMcq === null && mcqs && mcqs[0].mcq3 === mcqs[0].answer) {

      setCanswer(eachMcq && eachMcq.mcq3 || eachMcq === null && mcqs && mcqs[0].mcq3)
      setBanswer(null)
      setAanswer(null)
      setDanswer(null)
      setEanswer(null)

    }
    else if (eachMcq && eachMcq.mcq4 === eachMcq.answer || eachMcq === null && mcqs && mcqs[0].mcq4 === mcqs[0].answer) {

      setDanswer(eachMcq && eachMcq.mcq4 || eachMcq === null && mcqs && mcqs[0].mcq4)
      setBanswer(null)
      setCanswer(null)
      setAanswer(null)
      setEanswer(null)
    }
    else if (eachMcq && eachMcq.mcq5 === eachMcq.answer || eachMcq === null && mcqs && mcqs[0].mcq5 === mcqs[0].answer) {

      setEanswer(eachMcq && eachMcq.mcq5 || eachMcq === null && mcqs && mcqs[0].mcq5)
      setBanswer(null)
      setCanswer(null)
      setAanswer(null)
      setDanswer(null)
    }
  }



  const handleBookmark = async (e) => {

    try {
      const response = await axios.post('/api/set_bookmark_mcq', { key: 'Vx0cbjkzfQpyTObY8vfqgN1us', user_id: userObject?.data.user_id, mcq_id: eachMcq ? eachMcq.id : mcqs && mcqs[0].id })

      message.success("successfully Bookmarked")

      console.log("SUCCCCESS")
    }
    catch (err) {
      console.log("EROOOOOOR", err)

      message.error("Error in bookmarking this mcqs")
    }
  }

  const handleNotes = async (formData) => {


    try {
      const response = await axios.post('/api/set_mcq_note', { key: 'Vx0cbjkzfQpyTObY8vfqgN1us', user_id: formData.user_id, mcq_id: formData.mcq_id, note_heading: formData.note_heading, note_description: formData.note_description })
      message.success("Note Added Successfully")

    }
    catch (err) {
      console.log(err)
      message.error("Error, Note not added")

    }
  }




  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (formData) => {
    // Handle form submission here
    console.log('Form Data:', formData);
  };






  return (
    <>
      {loading ? (
        <div style={{ width: "100%", height: "600px", display: "flex", justifyContent: "center", alignItems: "center", }}>


          <Loader />
        </div>
      ) : (

        <div className=' relative'>
          <div className="bg-white-500 p-2">
            <div className="container mx-auto flex items-center justify-between">
              {/* Left Side: Logo */}
              <div className="flex items-center space-x-4">
                <Image src="/images/logo.svg" alt="logo" width={60} height={60} />
                {/* Social Icons */}
                <div className="flex space-x-2">
                  <span className="text-white hover:text-gray-200">
                    <Image src="/images/youtube.svg" alt="logo" width={30} height={30} />
                  </span>
                  <span className="text-white hover:text-gray-200">
                    <Image src="/images/facebook.svg" alt="logo" width={30} height={30} />
                  </span>
                  <span className="text-white hover:text-gray-200">
                    <Image src="/images/whatsapp.svg" alt="logo" width={30} height={30} />
                  </span>
                  <span className="">
                    <Image src="/images/instagram.svg" color='' alt="logo" width={30} height={30} />
                  </span>
                </div>
              </div>

              {/* Right Side: Menu Items */}
              <div className="hidden lg:flex space-x-6 items-center">
                <Link href="#" className="text-[#242864] mt-5 pr-10" style={{ fontWeight: 600 }}>Install App</Link>
                <Link href="#" className="text-[#242864] mt-5 pr-10" style={{ fontWeight: 600 }}>About Us</Link>
                <Link href="#" className="text-[#242864] mt-5 pr-10" style={{ fontWeight: 600 }}>Contact</Link>
                <Link href="#" className="text-[#242864] mt-5 pr-10" style={{ fontWeight: 600 }}>PDF Heaven</Link>
                <Link href="#" className="text-[#242864] mt-5 pr-10" style={{ fontWeight: 600 }}>Premium</Link>
                <span className='flex pr-10'>
                  <Image src="/images/home.png" color='' alt="logo" width={40} height={40} />
                </span>
              </div>
            </div>
          </div>
          <div className="absolute z-[-10] w-[100%] h-[400px]">
            <Image src="/images/bg.svg" layout="fill" alt='Image' // This tells Next.js to fill the parent container
              objectFit="cover" className="absolute top-0" />
          </div>
          <div className=" w-full z-10 flex flex-col items-center text-white py-[1rem] sm:py-[3rem] px-4">
            <div className="flex  md:justify-around justify-between items-center md:w-[60%] w-[100%]">



              <div className='flex flex-col items-center w-[30%]'>
                <h1 className='font-bold   text-xl'>Skipped</h1>
                <div className=" md:w-16 md:h-16 w-10 h-10 flex justify-center items-center bg-white rounded-md border border-[#FFFFFF] py-4 px-5   items-center">
                  <p className='text-4xl font-bold text-red-800'>{skip ? skip : 0}</p>
                </div>
              </div>

              <div className=" rounded-md  md:w-[30%] w-[35%]    lg:w-auto  sm:flex sm:flex-col items-center">
                <h1 className='font-bold text-xl'>Time Left</h1>
                <div className=' bg-white text-red-800 font-bold rounded-md p-1 text-center'>
                  <p className=" md:text-4xl text-3xl">{minutes} : {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</p>
                </div>
              </div>

              <div className='font-bold flex flex-col items-center text-lg w-[30%] '>
                <h1 className=''>Total</h1>
                <div className="rounded-md md:w-16 md:h-16 w-10 h-10  border bg-white border-[#FFFFFF] md:py-4 md:px-5 py-0 px-0  flex flex-col items-center">
                  <p className=" text-4xl  text-red-800">{mcqs ? (sliderValue > mcqs.length ? mcqs.length : sliderValue) : null}</p>
                </div>
              </div>

            </div>

            <div className="bg-white w-full sm:w-[80%] lg:w-[700px] rounded-lg text-black py-5 px-[1.5rem] my-[3rem] shadow-md ">
              <div className="flex  items-center justify-center w-full space-x-6 font-bold">
                Question # {i}
              </div>
              <div className="my-6  md:mx-[2rem] font-[500] text-[18px]">

                {
                  check ?
                    <>{eachMcq ? eachMcq.question : mcqs && mcqs[0]?.question}</> : <> Questions Ended</>

                }
              </div>
            </div>
            <div className="text-black  flex justify-center items-center md:space-x-6 md:px-[2rem] " style={{ width: "100%" }}>
              <div className="border border-[#0000001A] w-[200px] rounded-md px-2 hidden lg:flex items-center lg:flex-col">

                <div className="flex flex-col items-center text-center">
                  <h1 className="font-[600] my-4">GOOGLE ADs</h1>
                  <h1 className="font-[600] my-4">Are you an Enterpreneur?</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
                  <Link href="#" className="rounded-md my-3 bg-[#16213E] text-white py-2 px-7 font-[500] text-[18px]" >Next Que</Link>
                </div>
              </div>
              <div className="w-full">
                <div className="w-full flex flex-col ">
                  <div className="flex flex-col font-[500] text-[18px] space-y-5 mt-14">
                    {

                      check ?
                        <>

                          {mcqs && (
                            <>
                              <div>
                                <div
                                  className={`rounded-lg ${isASelected && !isAanswer && "bg-red-500"
                                    }   
                                  ${isAanswer && isASelected && "bg-green-500" || !isAanswer && isASelected && "bg-red-500" || !isASelected && isAanswer && "bg-green-500"
                                    } border py-3 px-3 flex items-center transition duration-300 ease-in-out transform hover:scale-104.5 hover:shadow-md cursor-pointer `}
                                  onClick={() => {
                                    handleSelect(1);
                                  }}
                                >
                                  A) {eachMcq ? eachMcq?.mcq1 : mcqs[0]?.mcq1} {isAanswer && <div className='  text-white  text-3xl ml-9'> &#10003;</div>} {!isAanswer && isASelected && <div className='  text-white  text-3xl ml-9'> &#10007;</div>}
                                </div>
                                {isAanswer && <div
                                  className={`rounded-lg ${isASelected && !isAanswer && "bg-red-500"
                                    }   
                                  ${isAanswer && isASelected && "bg-yellow-400" || !isAanswer && isASelected && "bg-red-500" || !isASelected && isAanswer && "bg-yellow-400"
                                    } border py-3 px-3 flex items-center transition duration-300 ease-in-out transform hover:scale-104.5 hover:shadow-md cursor-pointer `}
                                  onClick={() => {
                                    handleSelect(1);
                                  }}
                                >
                                  {isAanswer && <div>  <div dangerouslySetInnerHTML={{ __html: (eachMcq ? eachMcq?.explanation : mcqs[0]?.explanation) }} /> </div>}
                                </div>}
                              </div>
                              <div>
                                <div
                                  className={`rounded-lg ${isBSelected && !isBanswer && "bg-red-500"
                                    }   
                              ${isBanswer && isBSelected && "bg-green-500" || !isBanswer && isBSelected && "bg-red-500" || !isBSelected && isBanswer && "bg-green-500"
                                    }  border py-3 px-3 flex items-center transition duration-300 ease-in-out transform hover:scale-104.5 hover:shadow-md cursor-pointer `}
                                  onClick={() => {
                                    handleSelect(2);
                                  }}
                                >
                                  B) {eachMcq ? eachMcq?.mcq2 : mcqs[0]?.mcq2}  {isBanswer && <div className='  text-white  text-3xl ml-9'> &#10003;</div>} {!isBanswer && isBSelected && <div className='  text-white  text-3xl ml-9'> &#10007;</div>}
                                </div>
                                {isBanswer && <div
                                  className={`rounded-lg ${isBSelected && !isBanswer && "bg-red-500"
                                    }   
                              ${isBanswer && isBSelected && "bg-yellow-400" || !isBanswer && isBSelected && "bg-red-500" || !isBSelected && isBanswer && "bg-yellow-400"
                                    }  border py-3 px-3 flex items-center transition duration-300 ease-in-out transform hover:scale-104.5 hover:shadow-md cursor-pointer `}
                                  onClick={() => {
                                    handleSelect(2);
                                  }}
                                >
                                  {isBanswer && <div>    <div dangerouslySetInnerHTML={{ __html: (eachMcq ? eachMcq?.explanation : mcqs[0]?.explanation) }} /> </div>}
                                </div>}
                              </div>
                              <div>


                                <div
                                  className={`rounded-lg ${isCSelected && !isCanswer && "bg-red-500"
                                    }   
                              ${isCanswer && isCSelected && "bg-green-500" || !isCanswer && isCSelected && "bg-red-500" || !isCSelected && isCanswer && "bg-green-500"
                                    } border py-3 px-3 flex items-center transition duration-300 ease-in-out transform hover:scale-104.5 hover:shadow-md cursor-pointer `}
                                  onClick={() => {
                                    handleSelect(3);
                                  }}
                                >
                                  C) {eachMcq ? eachMcq.mcq3 : mcqs[0]?.mcq3}  {isCanswer && <div className='  text-white  text-3xl ml-9'> &#10003;</div>} {!isCanswer && isCSelected && <div className='  text-white  text-3xl ml-9'> &#10007;</div>}
                                </div>
                                {isCanswer && <div
                                  className={`rounded-lg ${isCSelected && !isCanswer && "bg-red-500"
                                    }   
                              ${isCanswer && isCSelected && "bg-yellow-400" || !isCanswer && isCSelected && "bg-red-500" || !isCSelected && isCanswer && "bg-yellow-400"
                                    } border py-3 px-3 flex items-center transition duration-300 ease-in-out transform hover:scale-104.5 hover:shadow-md cursor-pointer `}
                                  onClick={() => {
                                    handleSelect(3);
                                  }}
                                >
                                  {isCanswer && <div>    <div dangerouslySetInnerHTML={{ __html: (eachMcq ? eachMcq?.explanation : mcqs[0]?.explanation) }} /> </div>}
                                </div>}
                              </div>

                              <div>




                                <div
                                  className={`rounded-lg    
                               ${isDanswer && isDSelected && "bg-green-500" || !isDanswer && isDSelected && "bg-red-500" || !isDSelected && isDanswer && "bg-green-500"
                                    } border py-3 px-3 flex items-center transition duration-300 ease-in-out transform hover:scale-104.5 hover:shadow-md cursor-pointer `}
                                  onClick={() => {
                                    handleSelect(4);
                                  }}
                                >
                                  D) {eachMcq ? eachMcq?.mcq4 : mcqs[0]?.mcq4}  {isDanswer && <div className='  text-white  text-3xl ml-9'> &#10003;</div>} {!isDanswer && isDSelected && <div className='  text-white  text-3xl ml-9'> &#10007;</div>}
                                </div>
                                {
                                  isDanswer && <div
                                    className={`rounded-lg    
                               ${isDanswer && isDSelected && "bg-yellow-400" || !isDanswer && isDSelected && "bg-red-500" || !isDSelected && isDanswer && "bg-yellow-400"
                                      } border py-3 px-3 flex items-center transition duration-300 ease-in-out transform hover:scale-104.5 hover:shadow-md cursor-pointer `}
                                    onClick={() => {
                                      handleSelect(4);
                                    }}
                                  >
                                    {isDanswer && <div>     <div dangerouslySetInnerHTML={{ __html: (eachMcq ? eachMcq?.explanation : mcqs[0]?.explanation) }} /> </div>}
                                  </div>
                                }

                              </div>


                              <div>


                                <div
                                  className={`rounded-lg    
                               ${isEanswer && isESelected && "bg-green-500" || !isEanswer && isESelected && "bg-red-500" || !isESelected && isEanswer && "bg-green-500"
                                    } border py-3 px-3 flex items-center transition duration-300 ease-in-out transform hover:scale-104.5 hover:shadow-md cursor-pointer `}
                                  onClick={() => {
                                    handleSelect(5);
                                  }}
                                >
                                  E) {(eachMcq ? eachMcq?.mcq5 : mcqs[0]?.mcq5) !== "" ? eachMcq ? eachMcq?.mcq5 : mcqs[0]?.mcq5 : " None"} {isEanswer && <div className='  text-white  text-3xl ml-9'> &#10003;</div>} {!isEanswer && isESelected && <div className='  text-white  text-3xl ml-9'> &#10007;</div>}
                                </div>

                                {isEanswer && <div
                                  className={`rounded-lg    
                               ${isEanswer && isESelected && "bg-green-500" || !isEanswer && isESelected && "bg-red-500" || !isESelected && isEanswer && "bg-green-500"
                                    } border py-3 px-3 flex items-center transition duration-300 ease-in-out transform hover:scale-104.5 hover:shadow-md cursor-pointer `}
                                  onClick={() => {
                                    handleSelect(5);
                                  }}
                                >
                                  {isEanswer && <div>   :  <div dangerouslySetInnerHTML={{ __html: (eachMcq ? eachMcq?.explanation : mcqs[0]?.explanation) }} /> </div>}
                                </div>}
                              </div>

                            </>
                          )}

                        </> : <>
                          No Option because Either Questions Ended or Time Up
                        </>
                    }


                  </div>

                  <div className="flex w-full justify-around my-4">
                    <button
                      disabled={check ? false : true}
                      onClick={handleSkip}
                      className={`${check ? "bg-[#1F5689]  hover:bg-[#268FDA]" : 'bg-gray-400 '}   py-2 px-7 rounded-md text-white font-[500] text-[16px] mt-2 mr-2  hover:shadow-md transition duration-300 ease-in-out`}
                    >
                      Skip
                    </button>


                    <button

                      onClick={handleEachMcq}
                      disabled={isASelected || isBSelected || isCSelected || isDSelected || isESelected === true ? false : true}
                      className={` ${isASelected || isBSelected || isCSelected || isDSelected || isESelected ? "bg-[#cc2c2c] hover:bg-[#e64e4e]" : 'bg-gray-400'} py-2 px-7 rounded-md text-white font-[500] text-[16px] mt-2 mr-2  hover:shadow-md transition duration-300 ease-in-out `}
                    >
                      Next Ques
                    </button>
                  </div>

                </div>
                <div className="bg-[#146B53] rounded-md py-4 px-4 flex flex-wrap justify-evenly mt-8">
                  <div><button
                    className="rounded-full py-4 px-4 bg-white text-red-600">
                    <HelpIcon />
                  </button></div>
                

                  <div><button
                    onClick={handleBookmark}
                    className="rounded-full py-4 px-4 bg-white text-red-600">
                    <BookmarkIcon style={{ fontSize: '24px', marginLeft: '8px' }} /> {/* Add custom bookmark icon here */}
                  </button></div>
                 
                  <div><button
                    onClick={handleOpenModal}
                    className="rounded-full py-4 px-4 bg-white text-red-600 ">
                    <EditOutlined style={{ fontSize: '24px' }} />
                  </button></div>
                  <NotesCard showModal={showModal} setShowModal={setShowModal} onSubmit={handleNotes} user_id={userObject?.data.user_id} mcq_id={eachMcq ? eachMcq.id : mcqs && mcqs[0].id} />


                  <div><button
                    className="rounded-full py-4 px-4 bg-white text-red-600 ">
                    <PauseIcon style={{ fontSize: "24px", color: "red" }} />
                  </button></div>


                  <div><button
                    className="rounded-full py-4 px-4 bg-white text-red-600 ">
                    <ShareIcon style={{ fontSize: "24px", color: "red" }} />

                  </button></div>

                  <div><button
                    className="rounded-full py-4 px-4 bg-white text-red-600 ">
                    <CancelIcon style={{ fontSize: "24px", color: "red" }} />

                  </button></div>

                </div>
                {check ? <>  <div className="rounded-md border border-[#FAD7DD] mt-3">
                  <div><p className="bg-[#FAD7DD38]  py-3 px-3 font-[500]"> {eachMcq ? eachMcq.statistics_answer_percentage : mcqs[0]?.statistics_answer_percentage} % people answer it correct</p></div>
                  <div className="bg-[#FEE0019E] py-3 px-3"><p>{eachMcq ? eachMcq.statistics_attempted_count : mcqs[0]?.statistics_attempted_count} people attempted this MCQs</p></div>
                </div>
                  {/* <button className="bg-[#268FDA0A] py-3 px-3 rounded-md my-3 w-full text-left"><p>Severity of MCQs : {(eachMcq ? eachMcq.statistics_mcq_severity : mcqs[0]?.statistics_mcq_severity)===null || undefined && "Easy"  }</p></button> */}
                  <button className="bg-[#268FDA0A] py-3 px-3 rounded-md my-3 w-full text-left"><p>Severity of MCQs : {eachMcq ? eachMcq.statistics_mcq_severity : mcqs[0]?.statistics_mcq_severity} </p></button>
                </> : <p className='flex justify-center h-24 items-center'> Good Job !  </p>}

              </div>
              <div className="border lg:flex-col lg:flex hidden border-[#0000001A] w-[200px] rounded-md px-2  items-center ">

                <div className="flex flex-col items-center text-center">
                  <h1 className="font-[600] my-4">GOOGLE ADs</h1>
                  <h1 className="font-[600] my-4">Are you an Enterpreneur?</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
                  <Link href="#" className="rounded-md my-3 bg-[#16213E] text-white py-2 px-7 font-[500] text-[18px]" >Next Que</Link>
                </div>
              </div>
            </div>
          </div>
          <WebFooter />
        </div>
      )}
    </>
  )
}