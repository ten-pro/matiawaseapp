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
import swal from "sweetalert";
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
  const [isChat, setIsChat] = useState(false);
  const [isMenu, setIsMenu] = useState(true);
  const [isScheduleList, setIsScheduleList] = useState(false);
  const [isArrival, setIsArrival] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [nowSchedule, setNowSchedule] = useState<number>(0);
  const [currentArrival, setCurrentArrival] = useState<boolean>(false);//true:セリヌンティウス false:メロス
  const [globalArrival, setGlobalArrival] = useState<boolean>(false);
  const [apiRequest, setApiRequest] = useState<boolean>(false);
  const animationDuration = 500;

  const [chatList, setChatList] = useState<chatLists>({
    name: "スライムさん",
    messages: [
    ]
  });

  const [myLocation, setMyLocation] = useState<{lat:number,lng:number}>({
    lat: 35.6895, // 自分の緯度
    lng: 139.6917, // 自分の経度
  });

  const [otherLocation, setOtherLocation] = useState<{lat:number,lng:number}>({
    lat: 35.6895, // 相手の緯度
    lng: 139.6917, // 相手の経度
  });

  const [destination, setDestination] = useState<{lat:number,lng:number}>({
    lat: 34.6895, // 目的地の緯度
    lng: 138.6917, // 目的地の経度
  });

  useEffect(() => {
    axios
      .post('https://mp-class.chips.jp/matiawase/main.php', {
        update_currentlocation:'',
        appointment_id:'25',
        appointment_lat:myLocation.lat,
        appointment_lng:myLocation.lng,
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      .then(function (res) {
        console.log(res.data);
      })
  }, [myLocation])
  
  useEffect(() => {
    axios
      .post('https://mp-class.chips.jp/matiawase/main.php', {
        get_user: '',
        user_id: '6',
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      .then(function (res) {
        console.log(res.data);
        const data = res.data;
        if(data.get_schedulelist.length === 0){

        }else{
          setNowFace(facesArray[data.get_schedulelist[0].emoticon_id - 1].src);
    
          const name = data.user_information.user_name;
          let messages = new Array();
          messages = data.get_chatlist;
          setChatList({ name, messages });
    
          let scheduleList = new Array();
          for (let i = 0; i < data.get_schedulelist.length; i++) {
            scheduleList[i] = data.get_schedulelist[i];
          }
          setSchedules(scheduleList);
          
          setOtherLocation({
            lat: parseFloat(data.get_schedulelist[0].user_current[0].appointment_lat),
            lng: parseFloat(data.get_schedulelist[0].user_current[0].appointment_lng),
          });

          data.appointmentlist[0].appointment_status === '到着' ? setCurrentArrival(true) : setCurrentArrival(false);
          data.appointmentlist[0].partner_status[0].appointment_status === '到着' ? setGlobalArrival(true) : setGlobalArrival(false);
        }
        
      })
  }, [facesArray, apiRequest])
  
  useEffect(() => {
  }, [schedules])

  useEffect(() => {
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
    if(!currentArrival && !globalArrival){
      swal("未到着", "あなたも相手も未到着です", "warning")
      return;
    }
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
    if(!currentArrival && !globalArrival){
      swal("予定がありません", "メニューボタンから作成画面へ移動し予定を作成しましょう", "error")
      return;
    }
    setIsScheduleList(!isScheduleList)
  };
  useEffect(() => {
    setIsMenu(!isScheduleList)
    setIsVisible(isScheduleList)
  }, [isScheduleList])

  const arrival = () => {
    // arrival関数の処理
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
        setApiRequest(!apiRequest)
      })
  };

  return (
    <div>
      <Header />
      <div style={{ width: "100%", height: "696px", position:"absolute" }}>
        <GoogleMap 
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""} 
          otherLocation={otherLocation} 
          destination={destination} 
          setMyLocation={setMyLocation} 
        />
      </div>
      {
        isChat ?
          currentArrival || globalArrival ?
            currentArrival?
            <Chat onChat={chat} onChatList={chatList}/>
            :
            <Reply onChat={chat} onPostChat={postChat}/>
          :""
        :
        ""
      }
      {
        isScheduleList ?
        <ScheduleListComponent onSchedule={schedule} schedules={schedules} setNowSchedule={setNowSchedule}/>
        :
        ""
      }
      {
        isVisible || isChat || isScheduleList? 
        ""
        :
        currentArrival || globalArrival ?
          currentArrival?
          <FaceSelect onPostFace={postFace} schedules={schedules} />
          :
          <CenteredFace onNowFace={nowFace} /> 
        :
        ""
      }
      {
        !isOpen || isChat || isScheduleList || currentArrival?
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
