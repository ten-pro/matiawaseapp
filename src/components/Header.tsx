import { useState, useCallback, useEffect } from "react";
import styles from "@/styles/Header/Header.module.css";
import NowTime from "@/components/Header/NowTime";
import SunTimer from "@/components/Header/SunTimer";
import CountDown from "./Header/CountDown";
import Image from "next/image";
import { useAtom } from 'jotai';
import { nowBgimg, nowTime, maxTime, timeOut } from '@/atom/bgimg';
import { schedulesAtom, schedulesStatusAtom } from "@/atom/SchedulesAtom";

const Header = () => {

  const [timer] = useAtom(nowTime);
  const [max, setMax] = useAtom(maxTime);
  const [bgimg, setBgimg] = useAtom(nowBgimg);
  const [nowSchedule, setNowSchedule] = useAtom(schedulesStatusAtom);
  const [out] = useAtom(timeOut);
  const [schedules] = useAtom(schedulesAtom);
  const [CountDownTime, setCountDownTime] = useState<string>("00:00:00.00");
  const [startTimer, setStartTimer] = useState(false);

  const images = [
    "/images/Header/sougen.svg",
    "/images/Header/daybreak.svg",
    "/images/Header/rain.svg",
    "/images/Header/toutyaku.svg",
  ];

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

  useEffect(() => {
    if(out){
      setBgimg(2);
    }else if(timer / max > 0.3){
      setBgimg(0);
    }else if(timer / max > 0){
      setBgimg(1);
    }
  }, [timer]);

  // Header.tsx

  useEffect(() => {
    if (schedules.length > 0) {
      const scheduleTime = new Date(schedules[nowSchedule].schedule_time);
      const now = new Date(); // 実際の現在時刻を取得

      const diff = scheduleTime.getTime() - now.getTime();

      if (0 <= diff && diff <= 60 * 60 * 1000) { // 1時間以内
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        const milliseconds = diff % 1000;

        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
        const formattedMilliseconds = milliseconds.toString().padStart(2, '0');

        const remainingTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;

        setCountDownTime(remainingTime);
        setStartTimer(true);
      }
    }
  }, [schedules, setStartTimer]);
  
  


  return (
    <div className={styles.wrap}>
      <Image src={images[bgimg]} className={styles.bgimg} alt="背景" width={50} height={50} priority/>
      <NowTime onTimeChange={handleTimeChange} />
      <SunTimer onPositionChange={handlePositionChange} startTimer={startTimer} />
      <CountDown initialTime={CountDownTime} />
    </div>
  );
};

export default Header;
