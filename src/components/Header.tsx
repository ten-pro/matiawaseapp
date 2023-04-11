import { useState, useCallback } from "react";
import styles from "@/styles/Header/Header.module.css";
import NowTime from "@/components/Header/NowTime";
import SunTimer from "@/components/Header/SunTimer";
import CountDown from "./Header/CountDown";
import Image from "next/image";

const Header = () => {
  const images = [
    "/images/Header/sougen.svg",
  ];

  const [currentTime, setCurrentTime] = useState<string>("");
  const [sunPosition, setSunPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const handleTimeChange = useCallback((time: string) => {
    setCurrentTime(time);
  }, []);

  const handlePositionChange = useCallback((x: number, y: number) => {
    setSunPosition({ x, y });
  }, []);

  const handleImageChange = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, []);

  return (
    <div className={styles.wrap} onClick={handleImageChange}>
      <Image src={images[currentImageIndex]} className={styles.bgimg} alt="背景" width={50} height={50} priority/>
      <NowTime onTimeChange={handleTimeChange} />
      <SunTimer onPositionChange={handlePositionChange} />
      <CountDown initialTime="01:30:00.00" />
    </div>
  );
};

export default Header;
