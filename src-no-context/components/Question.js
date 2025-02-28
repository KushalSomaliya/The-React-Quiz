import Options from "./Options";

function Question({ question, dispatch, answer, index, preview = false }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        dispatch={dispatch}
        answer={answer}
        index={index}
        preview={preview}
      />
    </div>
  );
}

export default Question;
