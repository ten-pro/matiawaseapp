import React from "react";
import { Inter } from 'next/font/google'
import Styles from '@/styles/map/board.module.css'

const inter = Inter({ subsets: ['latin'] })

function BackGround() {
return (


<div className={Styles.adiv}>
    <div className={Styles.whiteBack}></div>
    <img src="../../img/map.jpg" className={Styles.map} />
    <div className={Styles.name}>スライムさん</div>
    <div className={Styles.hensin1}>今起きた！</div>
    <div className={Styles.hensin2}>忘れ物した</div>
    <div className={Styles.hensin3}>行けなさそう</div>
    <div className={Styles.close}>×</div>
</div>

);
}
export default BackGround
