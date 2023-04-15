import React from "react";
import styles from '@/styles/map/ArrivalButton.module.css'
import Image from "next/image";

interface ArrivalProps {
    onArrival: () => void;
}

const ArrivalButton: React.FC<ArrivalProps> = ({ onArrival }) => {
return (
    <Image
        src="images/map/arrival.svg"
        alt=""
        width={200}
        height={50}
        className={`${styles.arrival}`}
        onClick={onArrival}
    />
);
}
export default ArrivalButton
