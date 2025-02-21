function FinishScreen({ points, maxPossiblePoints, highscore, dispatch }) {
  const percentage = Number(((points / maxPossiblePoints) * 100).toFixed(2));

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦🏻";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You Scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({percentage}%)
      </p>
      <p className="highscore">(Highscore: {highscore} Points)</p>
      <button
        className="btn"
        style={{ display: "inline-block" }}
        onClick={() => dispatch({ type: "preview" })}
      >
        Preview
      </button>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Reset Quiz
      </button>
    </>
  );
}

export default FinishScreen;
