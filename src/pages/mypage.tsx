import Styles from "@/styles/Mypage.module.css";
import Header from "@/components/Header";
import Modoru from "@/components/mypage/modoru";
import Top from "@/components/Top";
import Btn from "@/components/mypage/btn";
import Mypage_input from "@/components/mypage/mypage_input"
import { useState } from "react";

function mypage(){

  

  return(
    <div>
      <Header/>
      <Modoru/>
      <div className={Styles.mypage_area}>
        <div className={Styles.input}>
          <Mypage_input/>
        </div>
        <Btn/>
      </div>
      <Top/>
    </div>
    
  )
}
export default mypage;