import { Inter } from 'next/font/google'
import Styles from '@/styles/Login/Card_login.module.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
const inter = Inter({ subsets: ['latin'] })


function Card() {
    const[name, setname] = useState<string>('')
    const[mail, setmail] = useState<string>('')
    const[pass, setpass] = useState<string>('')
    const[error, seterror] = useState<boolean>(false)

    const create_account = async () => {
      try {
        const response = await axios.post(
          'https://mp-class.chips.jp/matiawase/main.php',
          {
            create_user: '',
            name: name,
            pass: pass,
            mail: mail
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
          
        );
        console.log(response.data)
        if(response.data.create_acount === true) {
          localStorage.setItem('user_id', response.data.user_information.user_id)
          seterror(false)
          location.href = '/map'
        } else {
          seterror(true)
        }
      } catch(error) {
        console.log(error)
      }
    };
  return (
    
    <div className={Styles.div}>
        <div className={Styles.card}>
            <div className={Styles.title}>アカウントを作成してください</div>
            <input className={Styles.name} placeholder="ユーザー名" value={ name } onChange={(e) => setname(e.target.value)}/>
            <input className={Styles.pass} placeholder="メールアドレス"  value={ mail } onChange={(e) => setmail(e.target.value)}/>
            <input className={Styles.pass} placeholder="パスワード" type="password" value={ pass } onChange={(e) => setpass(e.target.value)}/>
            <div className={Styles.error} style={{display: error? 'block' : 'none'}}>エラー：名前が重複しています</div>
            <button className={ Styles.button }  onClick={ create_account }>アカウント作成</button>
        </div>
    </div>
  );
}
export default Card