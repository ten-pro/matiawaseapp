import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/map/MenuButton.module.css";

const MenuButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const animationDuration = 500;

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

  const mainButtonStyle = isOpen ? styles.hidden : styles.mainButton;
  const menuStyle = isOpen ? styles.menu : styles.hidden;

  // 配列を作成
  const buttonsData = [
    { id: 1, img: "/images/map/invisible.svg" },
    { id: 2, img: "/images/map/chat.svg" },
    { id: 3, img: "/images/map/profile.svg" },
    { id: 4, img: "/images/map/close.svg" },
    { id: 5, img: "/images/map/friend.svg" },
    { id: 6, img: "/images/map/schedule.svg" },
    // { id: 7, img: "/images/map/close.svg" },
    // { id: 8, img: "/images/map/arrival.svg" },
  ];

  return (
    <div className={styles.menuButtonContainer}>
      <Image 
        src="images/map/menu.svg"
        alt=""
        width={50}
        height={50}
        className={`${styles.button} ${mainButtonStyle}`} 
        onClick={toggleMenu} 
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
              isOpen ? (isClosing ? styles.menuItemClosing : styles.menuItemOpening) : ""
            }`}
            style={{
              width: i === 3 ? "40px" : "65px",
              height: i === 3 ? "40px" : "65px",
              "--rotate": `${60 * i}deg`
            } as React.CSSProperties}
            onClick={i === 3 ? toggleMenu : undefined}
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
        />
      </div>
    </div>
  );
};

export default MenuButton;
