import { useState, useCallback } from "react";

import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";
import quizCompleteImg from "../assets/quiz-complete.png";

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  //const activeQuestionIndex = userAnswers.length;
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  // to  find out wen the quiz is over (when the number of userAnswers = questions)
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered");
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });

      // after 1sec the answer state is changed to 'correct' or "wrong" and use this state to update the styling of the answer
      // the first answer [0] in the raw data is always the correct one
      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        // set another timer to reset the answer (no longer marked as right or wrong)
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  // useCallback to ensure the function doesnt get recreated unless it needed because their dependencies change
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  // this block only executes if we still have a question to display
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          //Using keys to reset QuestionTimer - every time the key changes (when the question changes),
          // react will unmount and remount this component, it will destroy the old component and create a new one
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {/* {QUESTIONS[activeQuestionIndex].answers.map((answer) => ( */}
          {shuffledAnswers.map((answer) => {
            const isSelected = userAnswers[userAnswers.length - 1] === answer;
            let cssClass = "";

            if (answerState === 'answered' && isSelected){
              cssClass = 'selected';
            }

            if ((answerState === 'correct' || setAnswerState === 'wrong') && isSelected){
              cssClass = answerState;
            }

            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => handleSelectAnswer(answer)}
                  className={cssClass}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
