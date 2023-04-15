import React from "react";
import { Inter } from 'next/font/google'
import Styles from '@/styles/map/reply.module.css'
import Image from "next/image";

interface ReplyProps {
    onChat: () => void;
    onPostChat: (post: number) => void;
}

const Reply: React.FC<ReplyProps> = ({ onChat, onPostChat }) => {
return (


<div className={Styles.adiv}>
    
    <div className={Styles.whiteBack}>
        <div className={Styles.replyWord1}>
            <div className={Styles.word} onClick={()=>onPostChat(1)} >もうすぐ</div>
            <div className={Styles.word} onClick={()=>onPostChat(2)} >今家でた</div>
            <div className={Styles.word} onClick={()=>onPostChat(3)} >忘れ物した</div>
        </div>
        <div className={Styles.replyWord2}>
            <div className={Styles.word} onClick={()=>onPostChat(4)} >まだかかりそう</div>
            <div className={Styles.word} onClick={()=>onPostChat(5)} >今起きた</div>
            <div className={Styles.word} onClick={()=>onPostChat(6)} >いけなさそう</div>
        </div>
        <Image className={Styles.close} src="/images/map/close.svg" alt="close" width={20} height={20} onClick={onChat}/>
    </div>
</div>

);
}
export default Reply
