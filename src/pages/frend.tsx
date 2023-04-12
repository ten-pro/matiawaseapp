import Styles from "@/styles/Frend.module.css";
import Header from "@/components/Header";
import Modoru from "@/components/modoru";
import Tuika from "@/components/frend/tuika";
import Top from "@/components/Top";
import Hyouzi from "@/components/frend/hyouzi";
import Frendinput from "@/components/frend/frendinput";
import Kakuteibtn from "@/components/frend/kakuteibtn";
import { useState } from "react";
import React from "react";

function frend(){

  const[inputdiv,setinputdiv] = useState<boolean>(true);
  const[hyouzidiv,sethyouzidiv] = useState<boolean>(false);
  const[tuikabtn,settuikabtn] = useState<boolean>(false);
  
  const hidediv = () =>{
    setinputdiv(false);
    sethyouzidiv(true);
    settuikabtn(true);
  }

  const [frendinput,setfrendinput] = useState<string>("");

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
          <Frendinput setfrendinput={setfrendinput}/>
          </div>
        </div>
        
      </div>
      <div style={{display:inputdiv?'block':'none'}}>
        <Tuika hidediv={hidediv} />
      </div>
      <div style={{display:tuikabtn?'block':'none'}}>
        <Kakuteibtn />
      </div>
      
      <Top/>
    </div>
    
  )
}
export default frend;