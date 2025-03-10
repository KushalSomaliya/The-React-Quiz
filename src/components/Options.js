import { useQuiz } from "../context/QuizContext";

function Options() {
  const { curQuestion, index, dispatch, answer, status } = useQuiz();

  const hasAnswered = answer.at(index) !== undefined;
  const isPreviewing = status === "preview";

  if (isPreviewing)
    return (
      <div className="options">
        {curQuestion.options.map((option, i) => (
          <button
            className={`btn btn-option ${
              i === answer.at(index) ? "answer" : ""
            } ${i === curQuestion.correctOption ? "correct" : "wrong"}`}
            key={option}
            disabled
          >
            {option}
          </button>
        ))}
      </div>
    );

  return (
    <div className="options">
      {curQuestion.options.map((option, i) => (
        <button
          className={`btn btn-option ${
            i === answer.at(index) ? "answer" : ""
          } ${
            hasAnswered
              ? i === curQuestion.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: i })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
