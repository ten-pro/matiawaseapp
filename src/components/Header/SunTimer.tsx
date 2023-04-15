import React, { useEffect, useState } from "react";
import styles from "@/styles/Header/SunTimer.module.css";
import Image from "next/image";
import { useAtom } from 'jotai';
import { maxTime, nowTime, timeOut } from '@/atom/bgimg';

type SunTimerProps = {
  onPositionChange?: (x: number, y: number) => void;
  startTimer: boolean;
};

const SunTimer: React.FC<SunTimerProps> = ({ onPositionChange, startTimer }) => {
  const [timer, setTimer] = useAtom(nowTime);
  const [max] = useAtom(maxTime);
  const [out, setOut] = useAtom(timeOut);


  useEffect(() => {
    setOut(false);
    const updateTimer = () => {
      if (startTimer) {
        setTimer((prevTimer) => (prevTimer - 1));
      }
    };
  
    const timerIntervalId = setInterval(updateTimer, 1000);
  
    return () => {
      clearInterval(timerIntervalId);
    };
  }, [startTimer]);
  

  useEffect(() => {
    if(timer=== 0 && !out){
      setTimer(max);
      setOut(true);
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
        src={out ? "/images/Header/moon.svg" : "/images/Header/sun.svg"}
        alt="太陽"
        width={70}
        height={70}
      />
    </>
  );
};

export default SunTimer;
