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
  const { unit_id, program_id, subject_id } = router.query;

  const [mcqs, setMcqs] = useState(null);

  const [len, SetLen] = useState(1);

  console.log(unit_id, " and ", program_id, " and ", subject_id)
  const [question, setQuestion] = useState();
  const [eachMcq, setEachMcq] = useState(null);
  const [check, setCheck] = useState(true);
  const handleEachMcq = () => {
    if (mcqs && mcqs.length > i) {
      setAanswer(null)
      setBanswer(null)
      setCanswer(null)
      setDanswer(null)
      setASelected(null)
      setBSelected(null)
      setCSelected(null)
      setDSelected(null)

      setEachMcq(mcqs && mcqs[i])
      setI(i + 1)
    }
    else {
      setCheck(false)

    }
  }
  const [i, setI] = useState(1)

  var response = null;
  useEffect((e) => {
    const getData = async () => {
      try {
        if (unit_id && program_id && subject_id) {

          response = await axios.post('/api/get_mcqs', { key: 'Vx0cbjkzfQpyTObY8vfqgN1us', unit_id: unit_id, program_id:program_id, subject_id: subject_id })
          console.log(response)
          setLoading(false)
          setMcqs(response.data.mcqs)


        }
        else{
          response = await axios.post('/api/get_mcqs', { key: 'Vx0cbjkzfQpyTObY8vfqgN1us', unit_id: unit_id, subject_id: subject_id })
          console.log(response)
          setLoading(false)
          setMcqs(response.data.mcqs)
        }

      } catch (error) {
        console.log("errrror")
        console.log(error)
      }

    }
    getData();
  }, [])


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(mcqs && mcqs.length).fill(''));

  const [timer, setTimer] = useState(3 * 60); // 10 minutes in seconds
  const [minutes, setMinutes] = useState(3); // 30 minutes in seconds

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

    if (mcqs && mcqs.length > i) {

      setSkip(skip + 1)
      setAanswer(null)
      setBanswer(null)
      setCanswer(null)
      setDanswer(null)
      setASelected(null)
      setBSelected(null)
      setCSelected(null)
      setDSelected(null)

      setEachMcq(mcqs && mcqs[i + 1])
      setI(i + 2)

    }
    else {
      setCheck(false)

    }

  }

  const skippedQuestions = userAnswers.filter((answer) => answer === 'skipped').length;
  const totalQuestions = mcqs && mcqs.length;


  const [isASelected, setASelected] = useState(false)
  const [isBSelected, setBSelected] = useState(false)
  const [isCSelected, setCSelected] = useState(false)
  const [isDSelected, setDSelected] = useState(false)

  const handleSelectA = () => {
    setASelected(true)
    setBSelected(false)
    setCSelected(false)
    setDSelected(false)

  }
  const handleSelectB = () => {
    setASelected(false)
    setBSelected(true)
    setCSelected(false)
    setDSelected(false)

  }
  const handleSelectC = () => {
    setASelected(false)
    setBSelected(false)
    setCSelected(true)
    setDSelected(false)
  }
  const handleSelectD = () => {
    setASelected(false)
    setBSelected(false)
    setCSelected(false)
    setDSelected(true)
  }
  const [isAanswer, setAanswer] = useState(null);
  const [isBanswer, setBanswer] = useState(null);
  const [isCanswer, setCanswer] = useState(null);
  const [isDanswer, setDanswer] = useState(null);
  const handleAnswer = () => {
    if (eachMcq && eachMcq.mcq1 === eachMcq.answer || eachMcq === null && mcqs && mcqs[0].mcq1 === mcqs[0].answer) {

      setAanswer(eachMcq && eachMcq.mcq1 || eachMcq === null && mcqs && mcqs[0].mcq1)
      setBanswer(null)
      setCanswer(null)
      setDanswer(null)

    }
    else if (eachMcq && eachMcq.mcq2 === eachMcq.answer || eachMcq === null && mcqs && mcqs[0].mcq2 === mcqs[0].answer) {

      setBanswer(eachMcq && eachMcq.mcq2 || eachMcq === null && mcqs && mcqs[0].mcq2)
      setAanswer(null)
      setCanswer(null)
      setDanswer(null)
    }
    else if (eachMcq && eachMcq.mcq3 === eachMcq.answer || eachMcq === null && mcqs && mcqs[0].mcq3 === mcqs[0].answer) {

      setCanswer(eachMcq && eachMcq.mcq3 || eachMcq === null && mcqs && mcqs[0].mcq3)
      setBanswer(null)
      setAanswer(null)
      setDanswer(null)
    }
    else if (eachMcq && eachMcq.mcq4 === eachMcq.answer || eachMcq === null && mcqs && mcqs[0].mcq4 === mcqs[0].answer) {

      setDanswer(eachMcq && eachMcq.mcq4 || eachMcq === null && mcqs && mcqs[0].mcq4)
      setBanswer(null)
      setCanswer(null)
      setAanswer(null)
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
                  <p className="ml-2">{mcqs && mcqs.length}</p>
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
                    <>{eachMcq ? eachMcq.question : mcqs && mcqs[0].question}</> : <> Questions Ended</>

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
                          {mcqs &&
                            <>

                              {/* ${eachMcq && eachMcq.mcq4 === eachMcq.answer || eachMcq === null && mcqs && mcqs[0].mcq4 === mcqs[0].answer ? "bg-slate-300" : "bg-white"} */}

                              <div
                                className={`rounded-lg ${isASelected && "bg-pink-400"}   ${isASelected && isAanswer && "bg-blue-500"}  ${isAanswer && "bg-slate-300"} border py-3 px-3 flex items-center transition duration-300 ease-in-out transform hover:scale-104.5 hover:shadow-md cursor-pointer `}
                                onClick={handleSelectA}
                              >
                                A) {eachMcq ? eachMcq.mcq1 : mcqs && mcqs[0].mcq1}
                              </div>
                              <div
                                className={`rounded-lg ${isBSelected && "bg-pink-400"}  ${isBSelected && isBanswer && "bg-blue-500"}  ${isBanswer && "bg-slate-300"} border py-3 px-3 flex items-center transition duration-300 ease-in-out transform hover:scale-104.5 hover:shadow-md cursor-pointer  `}
                                onClick={handleSelectB}
                              >
                                B) {eachMcq ? eachMcq.mcq2 : mcqs && mcqs[0].mcq2}
                              </div>
                              <div
                                className={`rounded-lg ${isCSelected && "bg-pink-400"}  ${isCSelected && isCanswer && "bg-blue-500"}  ${isCanswer && "bg-slate-300"} border py-3 px-3 flex items-center transition duration-300 ease-in-out transform hover:scale-104.5 hover:shadow-md cursor-pointer `}
                                onClick={handleSelectC}
                              >
                                C) {eachMcq ? eachMcq.mcq3 : mcqs && mcqs[0].mcq3}
                              </div>
                              <div
                                className={`rounded-lg ${isDSelected && "bg-pink-400"}  ${isDSelected && isDanswer && "bg-blue-500"}  ${isDanswer && "bg-slate-300"} border py-3 px-3 flex items-center transition duration-300 ease-in-out transform hover:scale-104.5 hover:shadow-md cursor-pointer `}
                                onClick={handleSelectD}
                              >
                                D) {eachMcq ? eachMcq.mcq4 : mcqs && mcqs[0].mcq4}
                              </div>
                            </>
                          }
                        </> : <>
                          No Option because Questions Ended
                        </>
                    }


                  </div>

                  <div className="flex w-full justify-between my-4">
                    <button
                      onClick={handleSkip}
                      className="bg-[#1F5689] py-2 px-7 rounded-md text-white font-[500] text-[16px] mt-2 mr-2 hover:bg-[#268FDA] hover:shadow-md transition duration-300 ease-in-out"
                    >
                      Skip
                    </button>
                    <button
                      onClick={handleAnswer}
                      className="bg-[#1F5689] py-2 px-7 rounded-md text-white font-[500] text-[16px] mt-2 mr-2 hover:bg-[#268FDA] hover:shadow-md transition duration-300 ease-in-out"
                    >
                      Answer
                    </button>
                    <button
                      onClick={handleEachMcq}
                      className="bg-[#D7392B] py-2 px-5 rounded-md text-white font-[500] text-[16px] mt-2 hover:bg-[#FF4D38] hover:shadow-md transition duration-300 ease-in-out"
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
                <div className="rounded-md border border-[#FAD7DD] mt-3">
                  <div><p className="bg-[#FAD7DD38]  py-3 px-3 font-[500]">Asked in 2+ papers (in 5 years)</p></div>
                  <div className="bg-[#FEE0019E] py-3 px-3"><p>ligaments and articular discs.</p></div>
                </div>
                <button className="bg-[#268FDA0A] py-3 px-3 rounded-md my-3 w-full text-left"><p>Disscus with community</p></button>
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