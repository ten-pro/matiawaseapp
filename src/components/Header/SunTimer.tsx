import React, { useEffect, useState } from "react";
import styles from "@/styles/Header/SunTimer.module.css";

type SunTimerProps = {
  onPositionChange: (x: number, y: number) => void;
};

const SunTimer = ({ onPositionChange }: SunTimerProps) => {
  const [timer, setTimer] = useState<number>(3600);
  const max = 3600;

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

  useEffect(() => {
    onPositionChange(x, y);
  }, [x, y, onPositionChange]);

  return (
    <>
      <div
        className={styles.sun}
        style={{ transform: `translate(${x}px, ${y}px)` }}
      ></div>
    </>
  );
};

export default SunTimer;
