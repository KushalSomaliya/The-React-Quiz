import { useQuiz } from "../context/QuizContext";

function Progress() {
  const { index, numQuestions, points, maxPossiblePoints, answer, status } =
    useQuiz();

  const isPreviewing = status === "preview";

  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={
          index + (isPreviewing ? 1 : Number(answer.at(index) !== undefined))
        }
      />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints} Points
      </p>
    </header>
  );
}

export default Progress;
