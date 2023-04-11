import Styles from "@/styles/Frend.module.css";
import { useState } from "react";
const tuika = () =>{

  const[clicked,setClicked] = useState(true);

  const handclick = () =>{
    setClicked(false);
  }
  
  return(
    <div className={Styles.tuika_area}>
      <button className={Styles.tuika_btn} onClick={handclick}>追加</button>
    </div>
  )
}
export default tuika;