import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const SECS_PER_QUESTION = 1;

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

function QuizProvider({ children }) {
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
  const curQuestion = questions.at(index);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        curQuestion,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        isTimerRunning,
        numQuestions,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error(`useQuiz() is used outside of QuizProvider`);
  return context;
}

export { QuizProvider, useQuiz };
