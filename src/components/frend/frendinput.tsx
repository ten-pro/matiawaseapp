import Styles from "@/styles/Frend.module.css";
import { useState } from "react";
const frendinput = () =>{

  return(
    <div >
      <input type="text" placeholder="メールアドレス" className={Styles.input} />

    </div>
  )
}
export default frendinput;