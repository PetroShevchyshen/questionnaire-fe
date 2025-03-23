import { FC, useCallback, useEffect, useState } from "react";
import { useTimerStore } from "../../store/timeStore";

interface TimerProp {
  stoppedTimer: boolean;
}

export const Timer: FC<TimerProp> = ({ stoppedTimer }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const setFinalTime = useTimerStore((store) => store.setFinalTime);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
    setFinalTime(formatTime(time));
  }, [setFinalTime, time]);

  useEffect(() => {
    if (!isRunning) return;

    if (stoppedTimer) {
      stopTimer();
      return;
    }

    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, stoppedTimer, stopTimer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="text-center p-4" onClick={stopTimer}>
      <h2 className="text-xl font-bold">Timer: {formatTime(time)}</h2>
    </div>
  );
};
