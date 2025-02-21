function Options({ question, index, dispatch, answer, preview }) {
  const hasAnswered = answer.at(index) !== undefined;

  if (preview)
    return (
      <div className="options">
        {question.options.map((option, i) => (
          <button
            className={`btn btn-option ${
              i === answer.at(index) ? "answer" : ""
            } ${i === question.correctOption ? "correct" : "wrong"}`}
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
      {question.options.map((option, i) => (
        <button
          className={`btn btn-option ${
            i === answer.at(index) ? "answer" : ""
          } ${
            hasAnswered
              ? i === question.correctOption
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
