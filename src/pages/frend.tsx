import Styles from "@/styles/Frend.module.css";
import Header from "@/components/Header";
import Modoru from "@/components/modoru";
import Tuika from "@/components/frend/tuika";
import Top from "@/components/Top";
import Hyouzi from "@/components/frend/hyouzi";
import Frendinput from "@/components/frend/frendinput";
import Kakuteibtn from "@/components/frend/kakuteibtn";
import { useEffect, useState } from "react";
import React from "react";
import { error } from "console";
import { frendlisttype,Name } from "./kanako";
import axios from "axios";

function frend(){

  const[inputdiv,setinputdiv] = useState<boolean>(true);
  const[hyouzidiv,sethyouzidiv] = useState<boolean>(false);
  const[tuikabtn,settuikabtn] = useState<boolean>(false);
  
  const hidediv = () =>{
    setinputdiv(false);
    sethyouzidiv(true);
    settuikabtn(true);
  }

  const[allfrenddata,setallfrenddata] = useState<frendlisttype>({
    friend_id:0,
    friend_name:''
  });


  const [frendname, setFrendname] = useState<Name[]>([
    { name: '上田' },
    { name: '上田' },
    { name: '上田' },
    { name: '宮川' },
    { name: '明石' },
  ]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'http://mp-class.chips.jp/matiawase/main.php',
          {
            login_user: '',
            name: '',
            pass: '',
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        if (response.data === false) {
          // userData.error1 = true;
        } else {
          sessionStorage.setItem('id', response.data.user_information.user_id);
          location.href;
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  return(
    <div>
      <Header/>
      <Modoru/>
      <div className={Styles.frend_area}>
        <p className={Styles.line1}>フレンド</p>
        <div className={Styles.hyouzi}>
          <div style={{display:inputdiv?'block':'none'}}>
            <Hyouzi names={frendname}/>
          </div>
          
          <div className={Styles.freinput_area} style={{display:inputdiv?'none':'block'}}>
          <Frendinput />
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