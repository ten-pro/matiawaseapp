import { Inter } from 'next/font/google'
import Styles from "@/styles/Mypage.module.css";
import { useState } from "react";
import React from "react";

function hyouzi(){

  const[hyou,sethyouzi] = useState<string>("");

  const[name,setname] = useState<string>("上田");

  const[mail,setmail] = useState<string>("ueda@gmail.com");

  return(
    <div>
      <p className={Styles.line1}>{name}</p>
      <p className={Styles.line2}>{mail}</p>
    </div>
    
  )
}
export default hyouzi;