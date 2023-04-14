// FaceSelect.tsx
import React, { useState } from "react";
import styles from "@/styles/map/FaceSelect.module.css";
import Image from "next/image";
import { useAtom } from 'jotai';
import { faces } from '@/atom/faceAtom';

interface FaceSelectProps {
  onPostFace: (a: number) => void;
}

const FaceSelect: React.FC<FaceSelectProps> = ({ onPostFace }) => {

  const [face, setFace] = useAtom(faces);

  return (
    <div className={styles.container}>
      {face.map((faces, i) => (
        <Image key={i} src={faces.src} alt="face" className={styles.svg} width={60} height={60} onClick={() => onPostFace(i)}/>
      ))}
    </div>
  );
};

export default FaceSelect;
