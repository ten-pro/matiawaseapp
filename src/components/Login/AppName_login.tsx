import React from "react";
import { Inter } from 'next/font/google'
import Styles from '@/styles/Login/AppName_login.module.css'

const inter = Inter({ subsets: ['latin'] })

function AppName() {
  return (
    
    <div className={Styles.div}>
      
        <div className={Styles.appName}>待合アプリ（仮）</div>
        <div className={Styles.card}></div>
    </div>
  );
}
export default AppName
