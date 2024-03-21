import { useState } from "react";

import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import QUESTIONS from "../questions.js";

export default function Question({
  index, // is te active question index
  // questionText,
  // answers,
  onSelectAnswer,
  // selectedAnswer,
  //answerState,
  onSkipAnswer,
}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <QuestionTimer
        //Using keys to reset QuestionTimer - every time the key changes (when the question changes),
        // react will unmount and remount this component, it will destroy the old component and create a new one
        // key={activeQuestionIndex}
        timeout={10000}
        onTimeout={onSkipAnswer}
      />
      {/* <h2>{questionText}</h2> */}
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        // key={activeQuestionIndex}
        // answers={answers}
        answers={QUESTIONS[index].answers}
        // selectedAnswer={selectedAnswer}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
