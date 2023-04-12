import React, { useEffect, useState } from "react";
import styles from "@/styles/Header/NowTime.module.css";

type NowTimeProps = {
  onTimeChange: (time: string) => void;
};

const NowTime = ({ onTimeChange }: NowTimeProps) => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const time = `${hours}:${minutes}`;
      setCurrentTime(time);
      onTimeChange(time);
    };

    updateCurrentTime();
    const intervalId = setInterval(updateCurrentTime, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [onTimeChange]);

  return (
    <div className={styles.wrap}>
      <div className={styles.NowTime}>
        {currentTime}
      </div>
    </div>
  );
};

export default NowTime;
