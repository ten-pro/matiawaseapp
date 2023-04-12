import Styles from "@/styles/Frend.module.css";
import { useState } from "react";
const frendinput = (props:any) =>{

  const sousin = (e:any) =>{
    props.setfrendinput(e.target.value);
  }

  return(
    <div >
      <input type="text" placeholder="メールアドレス" className={Styles.input} onChange={sousin}/>

    </div>
  )
}
export default frendinput;