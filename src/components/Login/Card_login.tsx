import React,{ useEffect, useState } from "react";
import { Inter } from 'next/font/google'
import Styles from '@/styles/Login/Card_login.module.css'
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

function Card() {
const [name, setname] = useState<string>('')
const [pass, setpass] = useState<string>('')
const [error, seterror] = useState<boolean>(false)

const try_login = async () => {
  try {
    const response = await axios.post(
      'http://mp-class.chips.jp/matiawase/main.php',
      {
        login_user: '',
        name: name,
        pass: pass
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log(response.data)
    if(response.data.login === true) {
      localStorage.setItem('user_id', response.data.user_information.user_id)
      seterror(false)
      console.log(localStorage.getItem('user_id'))
    } else {
      seterror(true)
      // console.log(response.data.login)
    }
  } catch(error) {
    console.log(error)
  }
}
  return (
    
    <div className={Styles.div}>
        <div className={Styles.card}>
            <div className={Styles.title}>ログインしてください</div>
            <input className={Styles.name} placeholder="ユーザー名" value={ name } onChange={(e) => setname(e.target.value)}></input>
            <input className={Styles.pass} placeholder="パスワード" value={ pass } onChange={(e) => setpass(e.target.value)}></input>
            <div className={Styles.error} style={{ display: error? 'block' : 'none' }}>エラー：名前とパスワードを確認してください</div>
            <button className={Styles.button} onClick={ try_login }>ログイン</button>
        </div>
    </div>
  );
}
export default Card
