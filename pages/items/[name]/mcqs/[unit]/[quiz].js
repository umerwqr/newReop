import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import WebFooter from '@/components/WebFooter'
import Image from 'next/image'
import Link from 'next/link'
export default function Quiz() {
    const quizData  =[
        {
            question: 'After lower premolar extraction patient feels numbness in right side of lower lip. Which nerve is affected?',
            options: [
                'A) Articular cartilage and synovial membrane.',
                'B) Synovial membrane and capsule.',
                'C) Capsule and ligaments.',
                'D) Ligaments and articular discs.',
            ],
            correctAnswer:  'C) Capsule and ligaments.',
        },
        {
            question: 'After lower premolar extraction patient feels numbness in right side of lower lip. Which nerve is affected?',
            options: [
                'A) Articular cartilage and synovial membrane.',
                'B) Synovial membrane and capsule.',
                'C) Capsule and ligaments.',
                'D) Ligaments and articular discs.',
            ],
            correctAnswer:  'C) Capsule and ligaments.',
        },
        {
            question: 'After lower premolar extraction patient feels numbness in right side of lower lip. Which nerve is affected?',
            options: [
                'A) Articular cartilage and synovial membrane.',
                'B) Synovial membrane and capsule.',
                'C) Capsule and ligaments.',
                'D) Ligaments and articular discs.',
            ],
            correctAnswer:  'C) Capsule and ligaments.',
        },
        {
            question: 'After lower premolar extraction patient feels numbness in right side of lower lip. Which nerve is affected?',
            options: [
                'A) Articular cartilage and synovial membrane.',
                'B) Synovial membrane and capsule.',
                'C) Capsule and ligaments.',
                'D) Ligaments and articular discs.',
            ],
            correctAnswer:  'C) Capsule and ligaments.',
        },
        {
            question: 'After lower premolar extraction patient feels numbness in right side of lower lip. Which nerve is affected?',
            options: [
                'A) Articular cartilage and synovial membrane.',
                'B) Synovial membrane and capsule.',
                'C) Capsule and ligaments.',
                'D) Ligaments and articular discs.',
            ],
            correctAnswer:  'C) Capsule and ligaments.',
        },
        {
            question: 'After lower premolar extraction patient feels numbness in right side of lower lip. Which nerve is affected?',
            options: [
                'A) Articular cartilage and synovial membrane.',
                'B) Synovial membrane and capsule.',
                'C) Capsule and ligaments.',
                'D) Ligaments and articular discs.',
            ],
            correctAnswer:  'C) Capsule and ligaments.',
        },
        {
            question: 'After lower premolar extraction patient feels numbness in right side of lower lip. Which nerve is affected?',
            options: [
                'A) Articular cartilage and synovial membrane.',
                'B) Synovial membrane and capsule.',
                'C) Capsule and ligaments.',
                'D) Ligaments and articular discs.',
            ],
            correctAnswer:  'C) Capsule and ligaments.',
        },

    ]
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState(Array(quizData.length).fill(''));
    const [isTimeUp, setTimeUp] = useState(false);
    const [timer, setTimer] = useState(30 * 60); // 30 minutes in seconds
  
    // Effect to handle the timer
    useEffect(() => {
      const timerInterval = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1);
        } else {
          clearInterval(timerInterval);
          setTimeUp(true);
          message.error("Time's Up!");
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
  
    const handleSkipQuestion = () => {
      // Mark the current question as skipped
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestionIndex] = 'skipped';
      setUserAnswers(newAnswers);
  
      // Move to the next question
      handleNextQuestion();
    };

    const skippedQuestions = userAnswers.filter((answer) => answer === 'skipped').length;
    const totalQuestions = quizData.length;
    const correctAnswers = userAnswers.filter(
        (answer, index) => answer === quizData[index].correctAnswer
      ).length;
      const wrongAnswers = totalQuestions - skippedQuestions - correctAnswers;
    
  return (
    <>
    <div className=' relative'>
        <div className="absolute z-[-10] w-[100%] h-[400px]">
            <Image src="/images/bg.svg" layout="fill" // This tells Next.js to fill the parent container
    objectFit="cover" className="absolute top-0"/>
        </div>
        <div className=" w-full z-10 flex flex-col items-center text-white py-[1rem] sm:py-[3rem] px-4">
        <div className="flex flex-wrap justify-center items-center space-y-2 lg:space-y-0 lg:space-x-5 w-full">
  <div className="rounded-md border border-[#FFFFFF] py-4 px-5 w-full lg:w-auto ">
    <h1>Total Time</h1>
    <p>{Math.floor(timer / 60)} Min {timer % 60}</p>
  </div>
  <div className="rounded-md bg-white w-full lg:w-[38%] flex justify-center py-4 px-5">
    <Image src="/images/logo.svg" width={80} height={80} alt="logo" />
  </div>
  <div className="hidden rounded-md border border-[#FFFFFF] py-4 px-5 w-full lg:w-auto  sm:flex sm:flex-col items-center">
    <h1>Skipped</h1>
    <p>{skippedQuestions}</p>
  </div>
  <div className="rounded-md border border-[#FFFFFF] py-4 px-5 w-full lg:w-auto flex flex-col items-end">
  <div className="flex sm:hidden">
    <h1>Skipped</h1>
    <p className="ml-2">{skippedQuestions}</p>
  </div>
  <h1>Total MCQs</h1>
  <p>{currentQuestionIndex + 1}/{totalQuestions}</p> 
</div>

</div>

            <div className="bg-white w-full sm:w-[80%] lg:w-[700px] rounded-lg text-black py-5 px-[1.5rem] my-[3rem] shadow-md ">
                <div className="flex  items-center justify-center w-full space-x-6">
                    <p className="text-[#D7392B]">{wrongAnswers}</p>
                    <Image src="/images/cross.svg" height={14} width={14}/>
                    <div className="w-[45%] bg-[#146B53] h-[13px]"></div>
                    <Image src="/images/tick.svg" height={14} width={14}/>
                    <p className="text-[#146B53]">{correctAnswers}</p>
                </div>
                <div className="my-6  md:mx-[2rem] font-[500] text-[18px]">
                After lower premolar extraction patient feels numbness in right side of lower lip.which nerve is effected
                </div>
            </div>
            <div className="text-black w-full flex justify-center items-center md:space-x-6 md:px-[2rem]">
            <div className="border border-[#0000001A] w-[200px] rounded-md px-2 hidden lg:flex items-center lg:flex-col">
                    <Image src="/images/portrait.svg" width={140} height={140}/>
                    <div className="flex flex-col items-center text-center">
                        <h1 className="font-[600] my-4">Are you an Enterpreneur?</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
                        <Link href="#" className="rounded-md my-3 bg-[#16213E] text-white py-2 px-7 font-[500] text-[18px]">Next Que</Link>
                    </div>
                </div>
                <div className="w-full">
                <div className="w-full flex flex-col ">
                <div className="flex flex-col font-[500] text-[18px] space-y-5">
                {quizData[currentQuestionIndex].options.map((option, index) => {
  const isUserSelected = userAnswers[currentQuestionIndex] === option;
  const isCorrectAnswer = option === quizData[currentQuestionIndex].correctAnswer;

  return (
    <div
      key={index}
      onClick={() => handleOptionClick(option)}
      className={`rounded-lg border py-3 px-3 flex items-center transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md cursor-pointer ${
        isUserSelected
          ? isCorrectAnswer
            ? 'bg-[#D5ECD9]'
            : 'bg-[#FAD7DD]'
          : ''
      } ${isCorrectAnswer && !isUserSelected ? 'bg-[#D5ECD9]' : ''}`}
    >
      {option}
    </div>
  );
})}


</div>

<div className="flex w-full justify-between my-4">
  <button onClick={handleSkipQuestion} className="bg-[#1F5689] py-2 px-7 rounded-md text-white font-[500] text-[18px] hover:bg-[#268FDA] hover:shadow-md transition duration-300 ease-in-out">Skip</button>
  <button onClick={handleNextQuestion} disabled={currentQuestionIndex === quizData.length - 1} className="bg-[#D7392B] py-2 px-5 rounded-md text-white font-[500] text-[18px] hover:bg-[#FF4D38] hover:shadow-md transition duration-300 ease-in-out">Next Que</button>
</div>

                </div>
                <div className="bg-[#146B53] rounded-md py-4 px-4 flex flex-wrap justify-evenly mt-8">
                    <div><button className="rounded-full py-4 px-4 bg-white"><Image src="/images/btn1.svg" width={15} height={15}/></button></div>
                    <div><button className="rounded-full py-4 px-4 bg-white"><Image src="/images/btn2.svg" width={12} height={12}/></button></div>
                    <div><button className="rounded-full py-4 px-4 bg-white"><Image src="/images/btn3.svg" width={15} height={15}/></button></div>
                    <div><button className="rounded-full py-4 px-4 bg-white"><Image src="/images/btn4.svg" width={15} height={15}/></button></div>
                    <div><button className="rounded-full py-4 px-4 bg-white" ><Image src="/images/btn5.svg" width={15} height={15}/></button></div>
                    <div><button className="rounded-full py-4 px-4 bg-white"><Image src="/images/btn6.svg" width={15} height={15}/></button></div>

                </div>
                <div className="rounded-md border border-[#FAD7DD] mt-3">
                    <div><p className="bg-[#FAD7DD38]  py-3 px-3 font-[500]">Asked in 2+ papers (in 5 years)</p></div>
                    <div className="bg-[#FEE0019E] py-3 px-3"><p>ligaments and articular discs.</p></div>
                </div>
                <button className="bg-[#268FDA0A] py-3 px-3 rounded-md my-3 w-full text-left"><p>Disscus with community</p></button>
                </div>
                <div className="border lg:flex-col lg:flex hidden border-[#0000001A] w-[200px] rounded-md px-2  items-center ">
                    <Image src="/images/portrait.svg" width={140} height={140}/>
                    <div className="flex flex-col items-center text-center">
                        <h1 className="font-[600] my-4">Are you an Enterpreneur?</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
                        <Link href="#" className="rounded-md my-3 bg-[#16213E] text-white py-2 px-7 font-[500] text-[18px]">Next Que</Link>
                    </div>
                </div>
            </div>
        </div>
       <WebFooter/>
    </div>
    </>
  )
}