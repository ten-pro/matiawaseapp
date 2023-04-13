import React, { useState } from "react";
import styles from "@/styles/map/FaceSelect.module.css";
import Image from "next/image";
import { useAtom } from 'jotai';
import { faces } from '@/atom/faceAtom';

const FaceSelect = () => {
  const [face, setFace] = useAtom(faces);

  return (
    <div className={styles.container}>
      {face.map((faces, i) => (
        <Image src={faces.src} alt="face" className={styles.svg} width={60} height={60} />
      ))}
    </div>
  );
};

export default FaceSelect;
