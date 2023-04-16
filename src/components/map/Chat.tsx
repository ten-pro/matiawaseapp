import React from "react";
import Styles from '@/styles/map/board.module.css'
import Image from "next/image";

interface ChatProps {
    onChat: () => void;
    onChatList: {
        name: string;
        messages: number[] | null;
    };
}

const BackGround: React.FC<ChatProps> = ({ onChat, onChatList }) => {

    const chatArray = [
        "もう着くよ",
        "今家でた！",
        "忘れ物した",
        "まだかかりそう",
        "今起きた",
        "いけなさそう",
    ]
return (
    <div className={Styles.whiteBack}>
        <div className={Styles.name}>{onChatList.name}</div>
            {onChatList.messages && onChatList.messages.map((message, i) => (
                <div className={Styles.hensin}>{chatArray[message]}</div>
            ))}
        <Image className={Styles.close} src="/images/map/close.svg" alt="close" width={20} height={20} onClick={onChat} style={{cursor: "pointer"}}/>
    </div>
);
}
export default BackGround
