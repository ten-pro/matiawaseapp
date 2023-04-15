// FaceSelect.tsx
import React, { useState, useEffect } from "react";
import styles from "@/styles/map/FaceSelect.module.css";
import Image from "next/image";
import { useAtom } from 'jotai';
import { faces } from '@/atom/faceAtom';

interface FaceSelectProps {
  onPostFace: (a: number) => void;
  schedules: {
    comment_id: number;
    emoticon_id: number;
    schedule_id: number;
    schedule_lat: string;
    schedule_lng: string;
    schedule_name: string;
    schedule_status: string;
    schedule_time: string;
  }[];
}

const FaceSelect: React.FC<FaceSelectProps> = ({ onPostFace, schedules }) => {


  const [face, setFace] = useAtom(faces);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    setRerender(!rerender);
  }, [schedules]);

  return (
    <div className={styles.container}>
      {face.map((faces, i) => (
        <Image
        key={i}
        src={faces.src}
        alt="face"
        className={schedules[0].emoticon_id === faces.id ? styles.selectedSvg : styles.normalSvg}
        width={60}
        height={60}
        onClick={() => onPostFace(i + 1)}
      />
      
      ))}
    </div>
  );
};

export default FaceSelect;
