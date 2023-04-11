import Styles from "@/styles/Frend.module.css";
import Header from "@/components/Header";
import Modoru from "@/components/mypage/modoru";
import Tuika from "@/components/frend/tuika";
import Top from "@/components/Top";
import Hyouzi from "@/components/frend/hyouzi";
import { useState } from "react";

function frend(){

  return(
    <div>
      <Header/>
      <Modoru/>
      <div className={Styles.frend_area}>
        <p className={Styles.line1}>フレンド</p>
        <div className={Styles.hyouzi}>
          <Hyouzi/>
        </div>
        
      </div>
      <Tuika/>
      <Top/>
    </div>
    
  )
}
export default frend;