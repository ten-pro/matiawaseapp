import React, { useEffect } from "react";
import styles from "@/styles/Header/SunTimer.module.css";
import Image from "next/image";
import { useAtom } from 'jotai';
import { maxTime, nowTime } from '@/atom/bgimg';

type SunTimerProps = {
  onPositionChange?: (x: number, y: number) => void;
};

const SunTimer: React.FC<SunTimerProps> = ({ onPositionChange }) => {
  const [timer, setTimer] = useAtom(nowTime);
  const [max] = useAtom(maxTime);

  useEffect(() => {
    const updateTimer = () => {
      setTimer((prevTimer) => (prevTimer - 1));
    };

    const timerIntervalId = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(timerIntervalId);
    };
  }, []);

  useEffect(() => {
    console.log(timer)
    if(timer=== 0){
      
    }
  }, [timer]);

  const progress = 1 - timer / max;
  const x = progress * (400 - 70);
  const y = 50 - 50 * Math.sqrt(1 - Math.pow((x - (200 - 35)) / (200 - 35), 2));

  useEffect(() => {
    onPositionChange?.(x, y);
  }, [x, y, onPositionChange]);

  return (
    <>
      <Image
        className={styles.sun}
        style={{ transform: `translate(${x}px, ${y}px)` }}
        src="/images/Header/sun.svg"
        alt="太陽"
        width={70}
        height={70}
      />
    </>
  );
};

export default SunTimer;
