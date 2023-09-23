import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import WebFooter from '@/components/WebFooter'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios';
import { useRouter } from 'next/router';
import Loader from '@/components/Loader';
export default function Quiz() {

  const [loading, setLoading] = useState(true);


  const router = useRouter();
  const { subject, sliderValue, sliderValue2 } = router.query;

  const [subjectObject, setSubjectObject] = useState(subject ? JSON.parse(subject) : null)

  console.log(" subject Object ", subjectObject, "   and  ", sliderValue)


  const [mcqs, setMcqs] = useState(null);
  console.log("mcsssqs",mcqs)
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
          const response = await axios.post('/api/get_mcqs', { key: 'Vx0cbjkzfQpyTObY8vfqgN1us', topic_id:subjectObject.topic_id?subjectObject.topic_id:"", unit_id: subjectObject.unit_id, program_id: subjectObject.program_id, subject_id: subjectObject.subject_id })
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



  return (
    <>
      {loading ? (
        <div style={{ width: "100%", height: "600px", display: "flex", justifyContent: "center", alignItems: "center", }}>


          <Loader />
        </div>
      ) : (
        <div className=' relative'>
          <div className="absolute z-[-10] w-[100%] h-[400px]">
            <Image src="/images/bg.svg" layout="fill" alt='Image' // This tells Next.js to fill the parent container
              objectFit="cover" className="absolute top-0" />
          </div>
          <div className=" w-full z-10 flex flex-col items-center text-white py-[1rem] sm:py-[3rem] px-4">
            <div className="flex flex-wrap justify-center items-center space-y-2 lg:space-y-0 lg:space-x-5 w-full">
              <div style={{ width: "65px" }}>
                <h1></h1>
                <p></p>
              </div>
              <div className=" rounded-md border border-[#FFFFFF] py-4 px-5 w-full lg:w-auto  sm:flex sm:flex-col items-center">
                <div className='flex sm:flex-col text-center'>


                  <h1>Time Remaining</h1>
                  <p className="ml-1">{minutes} : {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</p>
                </div>
              </div>
              <div className="rounded-md bg-white w-full lg:w-[38%] flex justify-center py-4 px-5">
                <Image src="/images/logo.svg" alt="No Image Available" width={80} height={80} />
              </div>
              <div className="hidden rounded-md border border-[#FFFFFF] py-4 px-5 w-full lg:w-auto  sm:flex sm:flex-col items-center">
                <h1>Skipped</h1>
                <p>{skip}</p>
              </div>
              <div className="rounded-md border border-[#FFFFFF] py-4 px-5 w-full lg:w-auto flex flex-col items-center">
                <div className="flex sm:hidden">
                  <h1>Skipped</h1>
                  <p className="ml-2">{skip}</p>
                </div>

                <div className='flex sm:flex-col sm:text-center'>


                  <h1>Total MCQs</h1>
                  <p className="ml-2">{mcqs ? (sliderValue > mcqs.length ? mcqs.length : sliderValue) : null}</p>
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
              {/* <div className="border border-[#0000001A] w-[200px] rounded-md px-2 hidden lg:flex items-center lg:flex-col">

                <div className="flex flex-col items-center text-center">
                  <h1 className="font-[600] my-4">Are you an Enterpreneur?</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
                  <Link href="#" className="rounded-md my-3 bg-[#16213E] text-white py-2 px-7 font-[500] text-[18px]" >Next Que</Link>
                </div>
              </div> */}
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
                      className={`${check ? "bg-[#1F5689]  hover:bg-[#268FDA]" : 'bg-gray-400 '}  py-2 px-7 rounded-md text-white font-[500] text-[16px] mt-2 mr-2  hover:shadow-md transition duration-300 ease-in-out`}
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
                  <div><button className="rounded-full py-4 px-4 bg-white"></button></div>
                  <div><button className="rounded-full py-4 px-4 bg-white"></button></div>
                  <div><button className="rounded-full py-4 px-4 bg-white"></button></div>
                  <div><button className="rounded-full py-4 px-4 bg-white"></button></div>
                  <div><button className="rounded-full py-4 px-4 bg-white"></button></div>
                  <div><button className="rounded-full py-4 px-4 bg-white"></button></div>

                </div>
                {check ? <>  <div className="rounded-md border border-[#FAD7DD] mt-3">
                  <div><p className="bg-[#FAD7DD38]  py-3 px-3 font-[500]"> {eachMcq ? eachMcq.statistics_answer_percentage : mcqs[0]?.statistics_answer_percentage} % people answer it correct</p></div>
                  <div className="bg-[#FEE0019E] py-3 px-3"><p>{eachMcq ? eachMcq.statistics_attempted_count : mcqs[0]?.statistics_attempted_count} people attempted this MCQs</p></div>
                </div>
                  {/* <button className="bg-[#268FDA0A] py-3 px-3 rounded-md my-3 w-full text-left"><p>Severity of MCQs : {(eachMcq ? eachMcq.statistics_mcq_severity : mcqs[0]?.statistics_mcq_severity)===null || undefined && "Easy"  }</p></button> */}
                  <button className="bg-[#268FDA0A] py-3 px-3 rounded-md my-3 w-full text-left"><p>Severity of MCQs : {eachMcq ? eachMcq.statistics_mcq_severity : mcqs[0]?.statistics_mcq_severity} </p></button>
                </> : <p className='flex justify-center h-24 items-center'> Good Job !  </p>}

              </div>
              {/* <div className="border lg:flex-col lg:flex hidden border-[#0000001A] w-[200px] rounded-md px-2  items-center ">

                <div className="flex flex-col items-center text-center">
                  <h1 className="font-[600] my-4">Are you an Enterpreneur?</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
                  <Link href="#" className="rounded-md my-3 bg-[#16213E] text-white py-2 px-7 font-[500] text-[18px]" >Next Que</Link>
                </div>
              </div> */}
            </div>
          </div>
          <WebFooter />
        </div>
      )}
    </>
  )
}