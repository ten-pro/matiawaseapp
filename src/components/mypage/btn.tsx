import Styles from "@/styles/Mypage.module.css";
import { useState } from "react";

const btn = (props:any) =>{

  const handleclick = () =>{
    props.hidediv();
  }

  return(
    <div className={Styles.btn_area}>
          <button className={Styles.btn} onClick={handleclick}>変更</button>
        </div>
  );
};
export default btn;