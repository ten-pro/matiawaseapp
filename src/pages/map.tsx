import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "@/styles/map/map.module.css";
import Header from "@/components/Header";
import FaceSelect from "@/components/map/FaceSelect";
import CenteredFace from "@/components/map/CenteredFace";
import MenuButton from "@/components/map/MenuButton";
import ScheduleListComponent from "@/components/map/ScheduleListComponent";
import Chat from "@/components/map/Chat";
import ArrivalButton from "@/components/map/ArrivalButton";
import axios from "axios";
import { useAtom } from "jotai";
import { faces } from "@/atom/faceAtom";

const GoogleMap = dynamic(() => import("@/components//map/GoogleMap"), { ssr: false });

interface schedules {
  date: string;
  plan: string;
}

const MapPage = () => {
  const [facesArray] = useAtom(faces);
  const [nowFace, setNowFace] = useState("images/map/face5.svg");
  const [isVisible, setIsVisible] = useState(false);
  const [isPlayer, setIsPlayer] = useState(false);
  const [isChat, setIsChat] = useState(false);
  const [isMenu, setIsMenu] = useState(true);
  const [isScheduleList, setIsScheduleList] = useState(false);
  const [isArrival, setIsArrival] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const animationDuration = 500;

  const [schedules,setSchedules] = useState<schedules[]>([
    { date: '2023/12/31 12:34', plan: '旅行' },
    { date: '2023/12/31 15:00', plan: '会議' },
    { date: '2023/12/31 18:00', plan: '打ち上げ' },
    { date: '2023/12/31 18:00', plan: '会食' },
    { date: '2023/12/31 18:00', plan: '飲み会' },
    { date: '2023/12/31 18:00', plan: '仕事' },
    { date: '2023/12/31 18:00', plan: 'プレゼン' },
  ]);

  const otherLocation = {
    lat: 35.6895, // 相手の緯度
    lng: 139.6917, // 相手の経度
  };
  
  useEffect(() => {
    axios
      .post('https://mp-class.chips.jp/matiawase/main.php', {
        get_user:'',
        user_id:'7',
      }, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      })
      .then(function(res){
        console.log(res.data.get_schedulelist[0].emoticon_id);
        setNowFace(facesArray[res.data.get_schedulelist[0].emoticon_id-1].src);
      })
  }, [])

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
        appointment_id:'26',
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
    console.log(post);
    //TODO: ここでfaceのpostを送信する
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
        <Chat onChat={chat}/>
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
        isVisible ? 
        ""
        :
        isPlayer ?
        <FaceSelect onPostFace={postFace}/>
        :
        <CenteredFace onNowFace={nowFace}/> 
      }
      {
        isOpen ?
        <ArrivalButton onArrival={arrival}/>
        :
        ""
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
