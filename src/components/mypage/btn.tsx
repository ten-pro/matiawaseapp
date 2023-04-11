import Styles from "@/styles/Mypage.module.css";
import { useState } from "react";

const btn = () =>{

  const[clicked,setClicked] = useState<boolean>(false);

  const handclick = () =>{
    setClicked(true);
  }

  return(
    <div className={Styles.btn_area}>
          <button className={Styles.btn} onClick={handclick}>{clicked?"保存":"変更"}</button>
        </div>
  );
};
export default btn;