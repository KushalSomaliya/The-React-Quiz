import { useEffect } from "react";

function Timer({ secondsRemaining, dispatch, isTimerRunning }) {
  const minites = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
      let id;
      if (isTimerRunning) {
        id = setInterval(() => {
          dispatch({ type: "tick" });
        }, 1000);
      } else {
        clearInterval(id);
      }

      return () => clearInterval(id);
    },
    [dispatch, isTimerRunning]
  );
  return (
    <div className="timer">
      {minites < 10 && "0"}
      {minites}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
