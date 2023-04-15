import Styles from "@/styles/Sakusei.module.css";
import Header from "@/components/Header";
import Modoru from "@/components/modoru";
import Btn from "@/components/sakusei/sakuseibtn";
import Form from "@/components/sakusei/form";
import Top from "@/components/Top";
import React, { useState } from 'react'


function sakusei(){
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [icon, setIcon] = useState<string>();

  function handleSendName(name: string) {
    setName(name);
  }
  function handleSendDate(date: string) {
    setDate(date);
  }
  function handleSendTime(time: string) {
    setTime(time);
  }
  function handleSendIcon(icon: string) {
    setIcon(icon);
  }
  // function handleClick() {
  //   console.log(name, date, time, icon);
  // }


  return(
    <div>
      {/* <Header/> */}
      <Modoru/>
        <div className={Styles.saku_area}>
          <div className={Styles.input_area}>
            
            <Form 
                onSendName={handleSendName}
                onSendDate={handleSendDate}
                onSendTime={handleSendTime}
                onSendIcon={handleSendIcon}/>
          </div>
          <Btn name={name} date={date} time={time} icon={icon}/>
          {/* <button onClick={handleClick}>debug2</button> */}
                  </div>
      <Top/>
    </div>
    
  )
}
export default sakusei;