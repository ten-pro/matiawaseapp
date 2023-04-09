import React, { useState } from "react";
import styles from "@/styles/map/FaceSelect.module.css";
import Image from "next/image";

const FaceSelect = () => {
  const [scale, setScale] = useState(1);

  return (
    <div className={styles.container}>
        <Image src="images/map/face5.svg" alt="face5" className={styles.svg} width={60} height={60} />
        <Image src="images/map/face4.svg" alt="face5" className={styles.svg} width={60} height={60} />
        <Image src="images/map/face3.svg" alt="face5" className={styles.svg} width={60} height={60} />
        <Image src="images/map/face2.svg" alt="face5" className={styles.svg} width={60} height={60} />
        <Image src="images/map/face1.svg" alt="face5" className={styles.svg} width={60} height={60} />
    </div>
  );
};

export default FaceSelect;
