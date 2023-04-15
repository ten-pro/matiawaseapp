import React, { useState } from "react";
import styles from "@/styles/map/CenteredFace.module.css";
import Image from "next/image";

interface CenteredFaceProps {
  onNowFace: string;
}

const FaceSelect: React.FC<CenteredFaceProps> = ({ onNowFace }) => {

  return (
    <div className={styles.container}>
        <Image src={onNowFace} alt="face5" className={styles.svg} width={60} height={60} />
    </div>
  );
};

export default FaceSelect;
