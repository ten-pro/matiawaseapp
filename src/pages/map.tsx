import React, { useState } from "react";
import dynamic from "next/dynamic";
import styles from "@/styles/map/map.module.css";
import Header from "@/components/Header";
import FaceSelect from "@/components/map/FaceSelect";
import MenuButton from "@/components/map/MenuButton";

const GoogleMap = dynamic(() => import("@/components//map/GoogleMap"), { ssr: false });

const MapPage = () => {
  const [scale, setScale] = useState(1);

  const otherLocation = {
    lat: 35.6895, // 相手の緯度
    lng: 139.6917, // 相手の経度
  };

  return (
    <div className={styles.container}>
      <Header />
      <div style={{ width: "100%", height: "696px", position:"absolute" }}>
        <GoogleMap apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""} otherLocation={otherLocation} />
      </div>
      <FaceSelect />
      <MenuButton />
    </div>
  );
};

export default MapPage;
