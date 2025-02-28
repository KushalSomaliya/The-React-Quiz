function NextButton({ dispatch, answer, index, numQuestions }) {
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
