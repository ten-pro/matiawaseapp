import React from "react";
import { Inter } from 'next/font/google'
import Styles from '@/styles/Login/Card_login.module.css'

const inter = Inter({ subsets: ['latin'] })

function Card() {
  return (
    
    <div className={Styles.div}>
        <div className={Styles.card}>
            <div className={Styles.title}>アカウントを作成してください</div>
            <input className={Styles.name} placeholder="ユーザー名"></input>
            <input className={Styles.pass} placeholder="メールアドレス"></input>
            <input className={Styles.pass} placeholder="パスワード" type="password"></input>
            <button className={Styles.button}>アカウント作成</button>
        </div>
    </div>
  );
}
export default Card
