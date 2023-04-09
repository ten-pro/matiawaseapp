import { useState, useCallback } from "react";
import styles from "@/styles/Header.module.css";
import NowTime from "@/components/Header/NowTime";
import SunTimer from "@/components/Header/SunTimer";

const Header = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [sunPosition, setSunPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleTimeChange = useCallback((time: string) => {
    setCurrentTime(time);
  }, []);

  const handlePositionChange = useCallback((x: number, y: number) => {
    setSunPosition({ x, y });
  }, []);

  return (
    <div className={styles.wrap}>
      <NowTime onTimeChange={handleTimeChange} />
      <SunTimer onPositionChange={handlePositionChange} />
      <div
        className={styles.sun}
        style={{ transform: `translate(${sunPosition.x}px, ${sunPosition.y}px)` }}
      ></div>
    </div>
  );
};

export default Header;
