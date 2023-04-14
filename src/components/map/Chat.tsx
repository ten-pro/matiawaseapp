import React from "react";
import Styles from '@/styles/map/board.module.css'
import Image from "next/image";

interface ChatProps {
    onChat: () => void;
}

const BackGround: React.FC<ChatProps> = ({ onChat }) => {
return (
    <div className={Styles.whiteBack}>
        <div className={Styles.name}>スライムさん</div>
        <div className={Styles.hensin}>今起きた！</div>
        <Image className={Styles.close} src="/images/map/close.svg" alt="close" width={20} height={20} onClick={onChat}/>
    </div>
);
}
export default BackGround
