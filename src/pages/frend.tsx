import Styles from "@/styles/Frend.module.css";
import Header from "@/components/Header";
import Modoru from "@/components/modoru";
import Tuika from "@/components/frend/tuika";
import Top from "@/components/Top";
import Hyouzi from "@/components/frend/hyouzi";
import Frendinput from "@/components/frend/frendinput";
import Kakuteibtn from "@/components/frend/kakuteibtn";
import { useEffect, useState,useCallback } from "react";
import React from "react";
import { error } from "console";
import axios from "axios";

type frendlisttype = {
  friend_id:number,
  friend_name:string
}
type Name = { name: string };

interface Friend {
  friend_id: number;
  friend_name: string;
}

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


  const [frendname, setFrendname] = useState<Name[]>([]);

  const [frendinput,setfrendinput] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setfrendinput(event.target.value);
  };

  
  const fetchData = useCallback(() => {
    const fetchDataAsync = async () => {
      try {
        const response = await axios.post(
          'https://mp-class.chips.jp/matiawase/main.php',
          {
            login_user: '',
            name: 'テストユーザ１',
            pass: 'pass0000',
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
          if (response.data.get_friendlist === null) {
            let friend_id: number = 0;
            let friend_name: string =
              'フレンドがいません。登録しませんか？';
            setallfrenddata({ friend_id: friend_id, friend_name: friend_name });
            setFrendname((prevFrendname) => [
              ...prevFrendname,
              { name: friend_name },
            ]);
            if (!response.data.get_frinedlist) {
              return;
            }
          } else {
            if (Array.isArray(response.data.get_friendlist)) {
              const friends = response.data.get_friendlist as Friend[];
              friends.forEach((friend) => {
                let friend_id: number = friend.friend_id;
                let friend_name: string = friend.friend_name;
                location.href;
                setFrendname((prevFrendname) => [
                  ...prevFrendname,
                  { name: friend_name },
                ]);
              });
             } else {
              let friend_id: number = response.data.get_friendlist.friend_id;
              let friend_name: string = response.data.get_friendlist.friend_name;
              location.href;
              setFrendname((prevFrendname) => [
                ...prevFrendname,
                { name: friend_name },
              ]);
             }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataAsync();
  }, []);
  
  useEffect(fetchData, []);

  const handleSaveChanges = async () => {
    try {
      const response = await axios.post(
        'https://mp-class.chips.jp/matiawase/main.php',
        {
          create_friend:'',
          follow_id:9,//友達のuser_id
          user_id:10//自分のuser_id
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setinputdiv(true);
      sethyouzidiv(false);
      settuikabtn(false);
    } catch (error) {
      console.log(error);
    }
  };

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
          <Frendinput inputValue={frendinput} onInputChange={handleInputChange}/>
          </div>
        </div>
        
      </div>
      <div style={{display:inputdiv?'block':'none'}}>
        <Tuika hidediv={hidediv} />
      </div>
      <div style={{display:tuikabtn?'block':'none'}}>
        <Kakuteibtn handleSaveChanges={handleSaveChanges}/>
      </div>
      
      <Top/>
    </div>
    
  )
}
export default frend;