import Styles from "@/styles/Sakusei.module.css";
import Header from "@/components/Header";
import Modoru from "@/components/modoru";
import Btn from "@/components/sakusei/sakuseibtn";
import Form from "@/components/sakusei/form";
import Top from "@/components/Top";

import MapSelect from "@/components/sakusei/MapSelect";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";

interface friends {
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
      .post(
        "https://mp-class.chips.jp/matiawase/main.php",
        {
          get_user: "",
          user_id: localStorage.getItem("user_id"),
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(function (res) {
        let friendList = new Array<friends>();
        try {
          for (let i = 0; i < res.data.get_friendlist.length; i++) {
            friendList[i] = res.data.get_friendlist[i];
          }
          setFriends(friendList);
        } catch (e) {
          let friendList = new Array<friends>();
          friendList[0] = {
            friend_id:0,
            friend_name:"フレンドがいません。登録しませんか？"
          }
          setFriends(friendList);
        }
      });
  }, []);

  const postCreate = async () => {
    axios
      .post(
        "https://mp-class.chips.jp/matiawase/main.php",
        {
          create_schedule: "",
          schedule_name: yotei,
          schedule_lat: place,
          schedule_lng: place,
          schedule_time: time,
          icon_id: icon,
          user_ids: [6, friend], //配列可
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(function (res) {
        if (res.data) {
          swal("予定を作成しました", "", "success");
        }
      });
  };

  return (
    <div>
      <Header />
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
