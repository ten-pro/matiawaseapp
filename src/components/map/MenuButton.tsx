import React, { useState } from "react";
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
    { id: 1, img: "images/map/visible.svg" },
    { id: 2, img: "images/map/invisible.svg" },
    { id: 3, img: "images/map/schedule.svg" },
    { id: 4, img: "images/map/chat.svg" },
    { id: 5, img: "images/map/create.svg" },
    { id: 6, img: "images/map/friend.svg" },
    { id: 7, img: "images/map/profile.svg" },
    { id: 8, img: "images/map/close.svg" },
    { id: 9, img: "images/map/arrival.svg" },
  ];

  return (
    <div className={styles.menuButtonContainer}>
      <button className={`${styles.button} ${mainButtonStyle}`} onClick={toggleMenu} />
      <div className={`${styles.menuContainer} ${menuStyle}`}>
        {/* 6つの周りのボタン */}
        {buttonsData.map((buttonData, i) => (
          <button
            key={buttonData.id}
            className={`${styles.button} ${styles.menuItem} ${
              isOpen ? (isClosing ? styles.menuItemClosing : styles.menuItemOpening) : ""
            }`}
            style={{
              width: i === 3 ? "35px" : "50px",
              height: i === 3 ? "35px" : "50px",
              "--rotate": `${60 * i}deg`
            } as React.CSSProperties}
            onClick={i === 3 ? toggleMenu : undefined}
          />
        ))}
        {/* 中心のボタン */}
        <button
          className={`${styles.button} ${styles.menuItem}`}
          style={{ width: "50px", height: "50px", transform: "translate(-50%, -50%)" }}
        />
      </div>
    </div>
  );
};

export default MenuButton;
