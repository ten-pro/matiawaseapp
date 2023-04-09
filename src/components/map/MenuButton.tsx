import React, { useState } from "react";
import styles from "@/styles/map/MenuButton.module.css";

const MenuButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
            className={`${styles.button} ${styles.menuItem}`}
            style={{
              width: "50px",
              height: "50px",
              transform: `translate(-50%, -50%) rotate(${60 * i}deg) translateY(-100px) rotate(${-60 * i}deg)`,
            }}
            onClick={i === 5 ? toggleMenu : undefined}
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
