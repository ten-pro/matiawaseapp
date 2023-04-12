import React from "react";
import { Inter } from 'next/font/google'
import Styles from '@/styles/map/reply.module.css'

const inter = Inter({ subsets: ['latin'] })

function BackGround() {
return (


<div className={Styles.adiv}>
    <img src="../../img/map.jpg" className={Styles.map} />
    
    <div className={Styles.whiteBack}>
    <img src="/svg/face.svg" className={Styles.face}/>
    <div className={Styles.replyWord1}>
        <div className={Styles.word}>もうすぐ</div>
        <div className={Styles.word}>今家でた</div>
        <div className={Styles.word}>忘れ物した</div>
    </div>
    <div className={Styles.replyWord2}>
        <div className={Styles.word}>まだかかりそう</div>
        <div className={Styles.word}>今起きた</div>
        <div className={Styles.word}>いけなさそう</div>
    </div>
    <div className={Styles.replyWord2}></div>
    </div>
    <div className={Styles.close}>×</div>
</div>

);
}
export default BackGround
