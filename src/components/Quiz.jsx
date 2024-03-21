import { useState, useCallback } from "react";

import QUESTIONS from "../questions.js";
// import QuestionTimer from "./QuestionTimer.jsx";
// import Answers from "./Answers.jsx";
import Question from "./Question.jsx";
import quizCompleteImg from "../assets/quiz-complete.png";

export default function Quiz() {
  // const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  //const activeQuestionIndex = userAnswers.length;
  // const activeQuestionIndex =
  //   answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const activeQuestionIndex = userAnswers.length;

  // to  find out wen the quiz is over (when the number of userAnswers = questions)
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      // setAnswerState("answered");
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });

      // after 1sec the answer state is changed to 'correct' or "wrong" and use this state to update the styling of the answer
      // the first answer [0] in the raw data is always the correct one
      // setTimeout(() => {
      //   if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
      //     setAnswerState("correct");
      //   } else {
      //     setAnswerState("wrong");
      //   }

        // set another timer to reset the answer (no longer marked as right or wrong)
      //   setTimeout(() => {
      //     setAnswerState("");
      //   }, 2000);
      // }, 1000);
    },
    []// [activeQuestionIndex]
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

  return (
    <div id="quiz">
      <div id="question">
        <Question
          key={activeQuestionIndex}
          index={activeQuestionIndex}
          // questionText={QUESTIONS[activeQuestionIndex].text}
          // answers={QUESTIONS[activeQuestionIndex].answers}
          // answerState={answerState}
          // selectedAnswer={userAnswers[userAnswers.length - 1]}
          onSelectAnswer={handleSelectAnswer}
          onSkipAnswer={handleSkipAnswer}
        />
      </div>
    </div>
  );
}
