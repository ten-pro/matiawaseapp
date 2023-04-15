import Styles from "@/styles/Sakusei.module.css";
import Header from "@/components/Header";
import Modoru from "@/components/modoru";
import Btn from "@/components/sakusei/sakuseibtn";
import Form from "@/components/sakusei/form";
import Top from "@/components/Top";

import MapSelect from "@/components/sakusei/MapSelect";
import GoogleMap from "@/components/sakusei/BackgroundMap";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";

interface friends{
  friend_id: number;
  friend_name: string;
}

function Sakusei() {
  const [yotei, setYotei] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [icon, setIcon] = useState<number>();
  const [friend, setFriend] = useState<number>();
  const [friends, setFriends] = useState<friends[]>([]);
  

  useEffect(() => {
    axios
      .post('https://mp-class.chips.jp/matiawase/main.php', {
        login_user:'',
        name:'テストユーザ１',
        pass:'pass0000'
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      .then(function (res) {
        console.log(res.data);
        let friendList = new Array<friends>();
        for(let i = 0; i < res.data.get_friendlist.length; i++){
          friendList[i] = res.data.get_friendlist[i];
        }
        setFriends(friendList)
      })
    },[])

  const postCreate = async () => {
    axios
      .post('https://mp-class.chips.jp/matiawase/main.php', {
        create_schedule: '',
        schedule_name: yotei,
        schedule_lat: place,
        schedule_lng: place,
        schedule_time: time,
        icon_id: icon,
        user_ids: [6,friend] //配列可
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      .then(function (res) {
        console.log(res.data);
        if(res.data){
          swal("予定を作成しました","","success");
        }
      })
  }

  return (
    <div>
      <Header />
      <GoogleMap />
      <Modoru />
      <MapSelect />
      <div className={Styles.saku_area}>
        <div className={Styles.input_area}>
          <Form
            setYotei={setYotei}
            setPlace={setPlace}
            setTime={setTime}
            setIcon={setIcon}
            setFriend={setFriend}
            friends={friends}
          />
          
        </div>
        <Btn onClick={postCreate} />
      </div>
      <Top />
    </div>
  );
}
export default Sakusei;