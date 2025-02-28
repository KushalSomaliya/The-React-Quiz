import { useQuiz } from "../context/QuizContext";

function PreviewFooter() {
  const { index, dispatch, numQuestions } = useQuiz();

  return (
    <footer className="preview-footer">
      {index !== 0 && (
        <button
          className="btn"
          onClick={() => dispatch({ type: "previewPrevious" })}
        >
          Previous
        </button>
      )}

      <button className="btn" onClick={() => dispatch({ type: "reset" })}>
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
    </footer>
  );
}

export default PreviewFooter;
