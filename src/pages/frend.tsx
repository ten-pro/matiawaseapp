import Styles from "@/styles/Frend.module.css";
import Header from "@/components/Header";
import Modoru from "@/components/modoru";
import Tuika from "@/components/frend/tuika";
import Top from "@/components/Top";
import Hyouzi from "@/components/frend/hyouzi";
import Frendinput from "@/components/frend/frendinput";
import { useState } from "react";
import React from "react";

function frend(){

  const[inputdiv,setinputdiv] = useState<boolean>(true);
  const[hyouzidiv,sethyouzidiv] = useState<boolean>(false);
  
  const hidediv = () =>{
    setinputdiv(false);
    sethyouzidiv(true);
  }

  return(
    <div>
      <Header/>
      <Modoru/>
      <div className={Styles.frend_area}>
        <p className={Styles.line1}>フレンド</p>
        <div className={Styles.hyouzi}>
          <div style={{display:inputdiv?'block':'none'}}>
            <Hyouzi />
          </div>
          
          <div className={Styles.freinput_area} style={{display:inputdiv?'none':'block'}}>
          <Frendinput/>
          </div>
        </div>
        
      </div>
      <Tuika hidediv={hidediv}/>
      <Top/>
    </div>
    
  )
}
export default frend;