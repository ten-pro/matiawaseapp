import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "@/styles/map/map.module.css";
import Header from "@/components/Header";
import FaceSelect from "@/components/map/FaceSelect";
import CenteredFace from "@/components/map/CenteredFace";
import MenuButton from "@/components/map/MenuButton";
import ScheduleListComponent from "@/components/map/ScheduleListComponent";
import Chat from "@/components/map/Chat";
import Reply from "@/components/map/Reply";
import ArrivalButton from "@/components/map/ArrivalButton";
import axios from "axios";
import { useAtom } from "jotai";
import { faces } from "@/atom/faceAtom";
import { schedulesAtom } from "@/atom/SchedulesAtom";

const GoogleMap = dynamic(() => import("@/components//map/GoogleMap"), { ssr: false });

interface schedules {
  comment_id: number;
  emoticon_id: number;
  schedule_id: number;
  schedule_lat: string;
  schedule_lng: string;
  schedule_name: string;
  schedule_status: string;
  schedule_time: string;
}

interface chatLists {
  name: string;
  messages: number[];
}

const MapPage = () => {
  const [facesArray] = useAtom(faces);
  const [schedules, setSchedules] = useAtom(schedulesAtom);
  const [nowFace, setNowFace] = useState("images/map/face5.svg");
  const [isVisible, setIsVisible] = useState(false);
  const [isPlayer, setIsPlayer] = useState(true); //true:セリヌンティウス false:メロス
  const [isChat, setIsChat] = useState(false);
  const [isMenu, setIsMenu] = useState(true);
  const [isScheduleList, setIsScheduleList] = useState(false);
  const [isArrival, setIsArrival] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const animationDuration = 500;

  const [chatList, setChatList] = useState<chatLists>({
    name: "スライムさん",
    messages: [
    ]
  });

  const otherLocation = {
    lat: 35.6895, // 相手の緯度
    lng: 139.6917, // 相手の経度
  };
  
  useEffect(() => {
    axios
      .post('https://mp-class.chips.jp/matiawase/main.php', {
        get_user: '',
        user_id: '7',
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      .then(function (res) {
        console.log(res.data);
        const data = res.data;
  
        setNowFace(facesArray[data.get_schedulelist[0].emoticon_id - 1].src);
  
        const name = data.user_information.user_name;
        let messages = new Array();
        messages[0] = data.get_schedulelist[0].comment_id;
        setChatList({ name, messages });
  
        let scheduleList = new Array();
        for (let i = 0; i < data.get_schedulelist.length; i++) {
          scheduleList[i] = data.get_schedulelist[i];
        }
        setSchedules(scheduleList);
      })
  }, [facesArray])
  

  useEffect(() => {
    //TODO : 到着ボタンの表示非表示条件を追加する
    setIsVisible(isArrival)
  }, [isMenu])

  const toggleMenu = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, animationDuration);
    } else {
      setIsOpen(true);
    }
  };

  const visible = () => {
    // chat関数の処理
    console.log("表示非表示だよ")
    setIsVisible(!isVisible)
  };

  const chat = () => {
    // chat関数の処理
    console.log("チャットだよ")
    setIsChat(!isChat)
  };
  useEffect(() => {
    setIsVisible(isChat)
    setIsMenu(!isChat)
  }, [isChat])

  const postChat = (post: number) => {
    axios
      .post('https://mp-class.chips.jp/matiawase/main.php', {
        update_comment:'',
        appointment_id:'26',
        comment_id:post
      }, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      })
      .then(function(res){
        console.log(res);
      })
  }

  const schedule = () => {
    // schedule関数の処理
    console.log("スケジュールだよ")
    setIsScheduleList(!isScheduleList)
  };
  useEffect(() => {
    setIsMenu(!isScheduleList)
    setIsVisible(isScheduleList)
  }, [isScheduleList])

  const arrival = () => {
    // arrival関数の処理
    // apiを叩いて到着したことを伝える
    axios
      .post('https://mp-class.chips.jp/matiawase/main.php', {
        update_arrival:'',
        appointment_id:'25',
        schedule_id:'16'
      }, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      })
      .then(function(res){
        console.log(res);
      })
  }

  const postFace = (post: number) => {
    axios
      .post('https://mp-class.chips.jp/matiawase/main.php', {
        update_emoticon:'',
        appointment_id:'25',
        emoticon_id:post
      }, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      })
      .then(function(res){
        console.log(res);
      })
  };

  return (
    <div>
      <Header />
      <div style={{ width: "100%", height: "696px", position:"absolute" }}>
        <GoogleMap apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""} otherLocation={otherLocation} />
      </div>
      {
        isChat ?
          isPlayer ?
          <Chat onChat={chat} onChatList={chatList}/>
          :
          <Reply onChat={chat} onPostChat={postChat}/>
        :
        ""
      }
      {
        isScheduleList ?
        <ScheduleListComponent onSchedule={schedule} schedules={schedules}/>
        :
        ""
      }
      {
        isVisible || isChat? 
        ""
        :
        isPlayer ?
        <FaceSelect onPostFace={postFace}/>
        :
        <CenteredFace onNowFace={nowFace}/> 
      }
      {
        !isOpen || isChat?
        ""
        :
        <ArrivalButton onArrival={arrival}/>
      }
      {
        isMenu ?
        <MenuButton onToggleMenu={toggleMenu} onIsOpen={isOpen} onIsClosing={isClosing} onChat={chat} onSchedule={schedule} onVisible={visible} />
        :
        ""
      }
    </div>
  );
};

export default MapPage;
