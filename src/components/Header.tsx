import { useState, useCallback, useEffect } from "react";
import styles from "@/styles/Header/Header.module.css";
import NowTime from "@/components/Header/NowTime";
import SunTimer from "@/components/Header/SunTimer";
import CountDown from "./Header/CountDown";
import Image from "next/image";
import { useAtom } from 'jotai';
import { nowBgimg, nowTime, maxTime } from '@/atom/bgimg';

const Header = () => {

  const [timer] = useAtom(nowTime);
  const [max, setMax] = useAtom(maxTime);
  const [bgimg, setBgimg] = useAtom(nowBgimg);

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
    console.log(timer / max)
    if(timer / max > 0.3){
      setBgimg(0);
    }else if(timer / max > 0){
      setBgimg(1);
    }else{
      setBgimg(2);
    }
  }, [timer]);

  return (
    <div className={styles.wrap}>
      <Image src={images[bgimg]} className={styles.bgimg} alt="背景" width={50} height={50} priority/>
      <NowTime onTimeChange={handleTimeChange} />
      <SunTimer onPositionChange={handlePositionChange} />
      <CountDown initialTime="01:30:00.00" />
    </div>
  );
};

export default Header;
