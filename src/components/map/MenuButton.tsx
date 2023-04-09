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

  return (
    <div className={styles.menuButtonContainer}>
      <button className={`${styles.button} ${mainButtonStyle}`} onClick={toggleMenu} />
      <div className={`${styles.menuContainer} ${menuStyle}`}>
        {/* 6つの周りのボタン */}
        {Array.from({ length: 6 }).map((_, i) => (
          <button
            key={i}
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
