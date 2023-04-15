import Styles from "@/styles/Frend.module.css";
import { useState } from "react";
const tuika = (props:any) =>{

  const handleclick = () =>{
    props.hidediv();
  }

  
  return(
    <div className={Styles.tuika_area}>
      <button className={Styles.tuika_btn} onClick={handleclick}>追加</button>
    </div>
  )
}
export default tuika;