import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/map/MenuButton.module.css";

interface MenuButtonProps {
  onChat: () => void;
  onSchedule: () => void;
  onVisible: ()=> void;
  onToggleMenu: () => void;
  onIsOpen: boolean;
  onIsClosing: boolean;
}

const MenuButton: React.FC<MenuButtonProps> = ({ onVisible, onChat, onSchedule,onToggleMenu, onIsOpen, onIsClosing }) => {

  

  const URL = (event: React.MouseEvent, url: string) => {
    location.href=url;
  };

  const mainButtonStyle = onIsOpen ? styles.hidden : styles.mainButton;
  const menuStyle = onIsOpen ? styles.menu : styles.hidden;
  const backgroundgray = onIsOpen ? styles.backgroundgray : styles.opacity;

  // 配列を作成
  const buttonsData = [
    { id: 1, img: "/images/map/invisible.svg", url: "" },
    { id: 2, img: "/images/map/chat.svg", url: "" },
    { id: 3, img: "/images/map/profile.svg", url: "/profile" },
    { id: 4, img: "/images/map/close.svg", url: "" },
    { id: 5, img: "/images/map/friend.svg", url: "friend" },
    { id: 6, img: "/images/map/schedule.svg", url: "" },
    // { id: 7, img: "/images/map/close.svg" },
    // { id: 8, img: "/images/map/arrival.svg" },
  ];

  return (
    <div className={`${backgroundgray}`}>
      <div className={styles.menuButtonContainer}>
        <Image 
          src="images/map/menu.svg"
          alt="ああああ"
          width={50}
          height={50}
          className={`${styles.button} ${mainButtonStyle}`} 
          onClick={onToggleMenu} 
        />
        <div className={`${styles.menuContainer} ${menuStyle}`}>
          {/* 6つの周りのボタン */}
          {buttonsData.map((buttonData, i) => (
            <Image
              key={buttonData.id}
              src={buttonData.img}
              width={50}
              height={50}
              alt=""
              className={`${styles.button} ${styles.menuItem} ${
                onIsOpen ? (onIsClosing ? styles.menuItemClosing : styles.menuItemOpening) : ""
              }`}
              style={{
                width: i === 3 ? "40px" : "65px",
                height: i === 3 ? "40px" : "65px",
                "--rotate": `${60 * i}deg`
              } as React.CSSProperties}
              onClick={
                buttonData.id === 4
                  ? onToggleMenu
                  : buttonData.id === 3 || buttonData.id === 5
                  ? (event) => URL(event, buttonData.url)
                  : buttonData.id === 1
                  ? onVisible
                  : buttonData.id === 2
                  ? onChat
                  : buttonData.id === 6
                  ? onSchedule
                  : undefined
              }
            />
          ))}
          {/* 中心のボタン */}
          <Image
            src="images/map/create.svg"
            alt=""
            width={50}
            height={50}
            className={`${styles.button} ${styles.menuItem}`}
            style={{ width: "65px", height: "65px", transform: "translate(-50%, -50%)" }}
            onClick={(event) => URL(event, "/create")}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuButton;
