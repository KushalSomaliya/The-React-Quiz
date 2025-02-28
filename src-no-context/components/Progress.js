function Progress({
  index,
  numQuestions,
  points,
  maxPossiblePoints,
  answer,
  preview = false,
}) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + (preview ? 1 : Number(answer.at(index) !== undefined))}
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
