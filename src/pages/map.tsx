import React, { useState } from "react";
import dynamic from "next/dynamic";
import styles from "@/styles/map/map.module.css";
import Header from "@/components/Header";
import FaceSelect from "@/components/map/FaceSelect";
import CenteredFace from "@/components/map/CenteredFace";
import MenuButton from "@/components/map/MenuButton";

const GoogleMap = dynamic(() => import("@/components//map/GoogleMap"), { ssr: false });

const MapPage = () => {
  const [scale, setScale] = useState(1);
  const [isVisible, setIsVisible] = useState(true);

  const otherLocation = {
    lat: 35.6895, // 相手の緯度
    lng: 139.6917, // 相手の経度
  };
  
  const visible = () => {
    // chat関数の処理
    console.log("表示非表示だよ")
    setIsVisible(!isVisible)
  };

  const chat = () => {
    // chat関数の処理
    console.log("チャットだよ")
  };

  const schedule = () => {
    // schedule関数の処理
    console.log("スケジュールだよ")
  };

  return (
    <div>
      <Header />
      <div style={{ width: "100%", height: "696px", position:"absolute" }}>
        <GoogleMap apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""} otherLocation={otherLocation} />
      </div>
      {/* <FaceSelect /> */}
      {
        isVisible ? <CenteredFace /> : ""
      }
      <MenuButton onChat={chat} onSchedule={schedule} onVisible={visible} />
    </div>
  );
};

export default MapPage;
