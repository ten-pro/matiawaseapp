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
import { schedulesAtom, schedulesStatusAtom, appointmentAtom } from "@/atom/SchedulesAtom";

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
  const [nowSchedule, setNowSchedule] = useAtom(schedulesStatusAtom);
  const [appointmentId, setAppointmentId] = useAtom(appointmentAtom);
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

  // 自分の現在地を送信
  useEffect(() => {
    try{
    axios
      .post('https://mp-class.chips.jp/matiawase/main.php', {
        update_currentlocation:'',
        appointment_id:appointmentId[nowSchedule].appointment_id,
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
    }catch(e){
      console.log(e);
    }
  }, [myLocation])
  
  // ユーザーデータ取得
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
          console.log(data.get_schedulelist[nowSchedule])
          data.appointmentlist[nowSchedule].appointment_status === '到着' ? setCurrentArrival(true) : setCurrentArrival(false);
          data.appointmentlist[nowSchedule].partner_status[0].appointment_status === '到着' ? setGlobalArrival(true) : setGlobalArrival(false);

          let scheduleList = new Array();
          for (let i = 0; i < data.get_schedulelist.length; i++) {
            scheduleList[i] = data.get_schedulelist[i];
          }
          setSchedules(scheduleList);

          setAppointmentId(data.appointmentlist)
            
          setOtherLocation({
            lat: parseFloat(data.get_schedulelist[nowSchedule].user_current[0].appointment_lat),
            lng: parseFloat(data.get_schedulelist[nowSchedule].user_current[0].appointment_lng),
          });

          setDestination({
            lat: parseFloat(data.get_schedulelist[nowSchedule].schedule_lat),
            lng: parseFloat(data.get_schedulelist[nowSchedule].schedule_lng),
          });

          if(data.appointmentlist[nowSchedule].appointment_status === "到着" || data.appointmentlist[nowSchedule].partner_status[0].appointment_status === "到着"){
            try{
            setNowFace(facesArray[data.get_schedulelist[nowSchedule].emoticon_id - 1].src);
            }catch(e){
              setNowFace("images/map/face5.svg");
            }
            try{
              const name = data.appointmentlist[nowSchedule].chat_list[0].user_name;
              let messages = new Array();
              for(let i = 0; i<data.appointmentlist[nowSchedule].chat_list.length; i++){
                messages[i] = data.appointmentlist[nowSchedule].chat_list[0].comment_id;
              }
              setChatList({ name, messages });
            }catch(e){
              setChatList({ name: "相手未到着", messages: [] });
            }
          }
        }
        
      })
  }, [facesArray, apiRequest, nowSchedule])

  useEffect(() => {
    console.log(nowSchedule)
  },[nowSchedule])

  // 1分ごとにデータを取得
  useEffect(() => {
    const interval = setInterval(() => {
      setApiRequest(!apiRequest);
    }, 60000); // 1分 = 60,000ミリ秒
  
    // クリーンアップ関数を返すことで、コンポーネントがアンマウントされたときにタイマーをクリアします
    return () => clearInterval(interval);
  }, [apiRequest]);  
  
  useEffect(() => {
    console.log(appointmentId)
  }, [appointmentId])

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
    console.log(isOpen+" "+isClosing)
    if(!currentArrival && !globalArrival){
      swal("未到着", "あなたも相手も未到着です", "warning")
      return;
    }
    setIsChat(!isChat)
  };
  useEffect(() => {
    setIsOpen(false)
    setIsClosing(false)
    setIsVisible(isChat)
    setIsMenu(!isChat)
  }, [isChat])

  const postChat = (post: number) => {
    axios
      .post('https://mp-class.chips.jp/matiawase/main.php', {
        update_comment:'',
        appointment_id:appointmentId[nowSchedule].appointment_id,
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
    if(schedules.length === 0){
      swal("予定がありません", "メニューボタンから作成画面へ移動し予定を作成しましょう", "error")
      return;
    }
    setIsScheduleList(!isScheduleList)
  };
  useEffect(() => {
    setIsOpen(false)
    setIsClosing(false)
    setIsMenu(!isScheduleList)
    setIsVisible(isScheduleList)

  }, [isScheduleList])

  const scheduleChange = (post:number) => {
    setNowSchedule(post)
    swal("予定変更", "押された予定を適応しました", "success")
  }


  const arrival = () => {
    // arrival関数の処理
    axios
      .post('https://mp-class.chips.jp/matiawase/main.php', {
        update_arrival:'',
        appointment_id:appointmentId[nowSchedule].appointment_id,
        schedule_id:appointmentId[nowSchedule].schedule_id
      }, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      })
      .then(function(res){
        console.log(res);
        swal("到着！", "到着したことを送信しました！", "success")
        .then(() => {
          setApiRequest(!apiRequest)
        })
      })
  }

  const postFace = (post: number) => {
    axios
      .post('https://mp-class.chips.jp/matiawase/main.php', {
        update_emoticon:'',
        appointment_id:appointmentId[nowSchedule].appointment_id,
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
        <ScheduleListComponent onSchedule={schedule} schedules={schedules} onScheduleChange={scheduleChange} />
        :
        ""
      }
      {
        isVisible || isChat || isScheduleList? 
        ""
        :
        currentArrival || globalArrival ?
          currentArrival?
          <FaceSelect onPostFace={postFace} schedules={schedules} onNowSchedule={nowSchedule}/>
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
