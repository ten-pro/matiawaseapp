import Styles from "@/styles/Sakusei.module.css";
import Header from "@/components/Header";
import Modoru from "@/components/modoru";
import Btn from "@/components/sakusei/sakuseibtn";
import Form from "@/components/sakusei/form";
import Top from "@/components/Top";
import { useState } from "react";

function sakusei(){

  const [yotei,setyotei] = useState<string>("");

  const [place,setplace] = useState<string>("");

  const [time,settime] = useState<string>("");

  const[icon,seticon] = useState<any>("");
  
  return(
    <div>
      <Header/>
      <Modoru/>
        <div className={Styles.saku_area}>
          <div className={Styles.input_area}>
            
            <Form setyotei={setyotei}
            setplace={setplace}
            settime={settime}
            seticon={seticon}/>
          </div>
          <Btn/>
        </div>
        
      <Top/>
    </div>
    
  )
}
export default sakusei;