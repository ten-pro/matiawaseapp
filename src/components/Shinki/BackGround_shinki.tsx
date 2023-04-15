import React from "react";
import { Inter } from 'next/font/google'
import Styles from '@/styles/Login/BackGround_login.module.css'

const inter = Inter({ subsets: ['latin'] })

function BackGround() {
    function transition_Login() {
        location.href = '/login'
    }
return (

<div className={Styles.div}>
    {/* <video src="../../img/map.mp4" className={Styles.map} autoPlay loop></video> */}
    <img src="../../img/map.jpg" className={Styles.map} />
    <div className={Styles.pinkBack}></div>
    <div className={Styles.underWhite}>
        <div className={Styles.create}>アカウントをお持ちですか？</div>
        <div className={Styles.createButton} onClick={ transition_Login}>ログインする</div>
    </div>
</div>
);
}
export default BackGround
