import { useEffect, useState } from "react";
import styles from "@/styles/Header.module.css";

const Map = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [timer, setTimer] = useState<number>(60);
  const max = 60;

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateCurrentTime();
    const intervalId = setInterval(updateCurrentTime, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const updateTimer = () => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : max));
    };

    const timerIntervalId = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(timerIntervalId);
    };
  }, []);

  const progress = 1 - timer / max;
  const x = progress * (414 - 70);
  const y = 50 - 50 * Math.sqrt(1 - Math.pow((x - (207 - 35)) / (207 - 35), 2));

  return (
    <div className={styles.wrap}>
      <div className={styles.NowTime}>{currentTime}</div>
      <div
        className={styles.sun}
        style={{ transform: `translate(${x}px, ${y}px)` }}
      ></div>
    </div>
  );
};

export default Map;
