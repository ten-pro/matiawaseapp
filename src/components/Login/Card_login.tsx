import React from "react";
import { Inter } from 'next/font/google'
import Styles from '@/styles/Login/Card_login.module.css'
// import { pink } from '@/atom/Login'


const inter = Inter({ subsets: ['latin'] })


function Card() {


  return (
    
    <div className={Styles.div}>
        <div className={Styles.card}>
            <div className={Styles.title}>ログインしてください</div>
            <input className={Styles.name} placeholder="ユーザー名"></input>
            <input className={Styles.pass} placeholder="パスワード"></input>
            <div className={Styles.forgotPass}>パスワードを忘れましたか？</div>
            <button className={Styles.button}>ログイン</button>
        </div>
    </div>
  );
}
export default Card
