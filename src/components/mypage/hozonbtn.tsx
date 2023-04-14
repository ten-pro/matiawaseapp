import Styles from "@/styles/Mypage.module.css";
import { useState } from "react";

const hozonbtn = (props:any) =>{

  return(
    <div className={Styles.btn_area}>
      <button className={Styles.btn} onClick={props.handleSaveChanges}>保存</button>
        </div>
  );
};
export default hozonbtn;