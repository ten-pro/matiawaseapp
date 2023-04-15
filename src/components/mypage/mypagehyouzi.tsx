import { Inter } from 'next/font/google'
import Styles from "@/styles/Mypage.module.css";
import { useState } from "react";
import React from "react";

interface User {
  user_name: string;
  user_mail: string;
}

const Mypagehyouzi: React.FC<User> = ({ user_name, user_mail }) => {
  return (
    <div>
      <p className={Styles.line1}>{user_name}</p>
      <p className={Styles.line2}>{user_mail}</p>
    </div>
  );
};

export default Mypagehyouzi;