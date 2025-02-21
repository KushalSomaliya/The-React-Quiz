import { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const SECS_PER_QUESTION = 10;

const initialState = {
  questions: [],

  // loading, error, ready, active, finished, preview
  status: "loading",
  index: 0,
  answer: [],
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  isTimerRunning: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
        isTimerRunning: true,
      };

    case "newAnswer":
      const question = state.questions.at(state.index);
      const newAnswer = action.payload;
      const pointsGained =
        question.correctOption === newAnswer ? question.points : 0;

      return {
        ...state,
        answer: [...state.answer, newAnswer],
        points: state.points + pointsGained,
        isTimerRunning: false,
      };

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        isTimerRunning: true,
      };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.highscore < state.points ? state.points : state.highscore,
      };

    case "reset":
      return {
        ...initialState,
        highscore: state.highscore,
        status: "ready",
        questions: state.questions,
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
        highscore:
          state.highscore < state.points ? state.points : state.highscore,
      };

    case "preview":
      return { ...state, status: "preview", index: 0 };

    case "previewPrevious":
      return { ...state, index: state.index - 1 };

    case "previewNext":
      return { ...state, index: state.index + 1 };

    default:
      throw new Error("Unknown Action");
  }
}

export default function App() {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
      isTimerRunning,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions.at(index)}
              dispatch={dispatch}
              answer={answer}
              index={index}
            />
            <Footer>
              <Timer
                secondsRemaining={secondsRemaining}
                dispatch={dispatch}
                isTimerRunning={isTimerRunning}
              />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
        {status === "preview" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
              preview={true}
            />
            <Question
              question={questions.at(index)}
              answer={answer}
              index={index}
              preview={true}
            />
            <Footer className="preview-footer">
              {index !== 0 && (
                <button
                  className="btn"
                  onClick={() => dispatch({ type: "previewPrevious" })}
                >
                  Previous
                </button>
              )}

              <button
                className="btn"
                onClick={() => dispatch({ type: "reset" })}
              >
                Reset
              </button>

              {index !== numQuestions - 1 && (
                <button
                  className="btn"
                  onClick={() => dispatch({ type: "previewNext" })}
                >
                  Next
                </button>
              )}
            </Footer>
          </>
        )}
      </Main>
    </div>
  );
}
