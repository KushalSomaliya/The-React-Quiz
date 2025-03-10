import { useQuiz } from "../context/QuizContext";

function NextButton() {
  const { dispatch, answer, index, numQuestions } = useQuiz();

  if (answer.at(index) === undefined) return null;

  const isNotLastQuestion = index < numQuestions - 1;

  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        dispatch({ type: isNotLastQuestion ? "nextQuestion" : "finish" })
      }
    >
      {isNotLastQuestion ? "Next" : "Finish"}
    </button>
  );
}

export default NextButton;
