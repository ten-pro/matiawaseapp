import Styles from "@/styles/Sakusei.module.css";
import Header from "@/components/Header";
import Modoru from "@/components/modoru";
import Btn from "@/components/sakusei/sakuseibtn";
import Form from "@/components/sakusei/form";
import Top from "@/components/Top";
import { useEffect, useState } from "react";

function sakusei(){

  const [yotei,setyotei] = useState<string>("");

  const [place,setplace] = useState<string>("");

  const [time,settime] = useState<string>("");

  const[icon,seticon] = useState<any>("");

 

  const requestOptions = {
    method: 'POST',
    // headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      schedule_name:yotei,
      schedule_lat:place,
      schedule_lng:place,
      schedule_time:time,
      icon_id:icon,
     })
  };

  const create_list = [{

  }]

  useEffect(()=>{
    fetch('https://mp-class.chips.jp/matiawase/main.php', requestOptions)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
})
 
  
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