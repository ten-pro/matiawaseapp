import Styles from "@/styles/Sakusei.module.css";
import React, { useState , useEffect } from "react";
// import { useAtom } from 'jotai'
// import { id_array } from '@/atom/sakusei'
// import { name_array } from '@/atom/sakusei'
import { numArray, strArray } from '@/atom/sakusei'

export interface FormProps {
  setYotei: (value: string) => void;
  setPlace: (value: string) => void;
  setTime: (value: string) => void;
  setIcon: (value: number) => void;
  setFriend: (value: number) => void;
  friends: {
    friend_id: number;
    friend_name: string;
  }[];
}

const Form: React.FC<FormProps> = ({ setYotei, setPlace, setTime, setIcon, setFriend, friends }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "yotei":
        setYotei(value);
        break;
      case "place":
        setPlace(value);
        break;
      case "time":
        setTime(value);
        break;
      case "icon":
        setIcon(parseInt(value, 10));
        break;
      case "friend":
        setFriend(parseInt(value, 10));
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <form>
        <input type="text" name="yotei" placeholder="予定名" className={Styles.input} onChange={handleInputChange} />
        <input type="datetime-local" name="time" placeholder="集合時間" className={Styles.inputTime} onChange={handleInputChange} />
        <select name="friend" className={Styles.select} onChange={handleInputChange}>
          <option hidden>フレンド選択</option>
          {friends.map((friend,i) => (
            <option key={friend.friend_id}  value={friend.friend_id} className={Styles.op}>
              {friend.friend_name}
            </option>
          ))}
        </select>
        <select name="icon" className={Styles.select} onChange={handleInputChange}>
          <option hidden>予定アイコン一覧</option>
          <option value="1" className={Styles.op}>食事</option>
          <option value="2" className={Styles.op}>旅行</option>
          <option value="3" className={Styles.op}>イベント</option>
        </select>
      </form>
    </div>
  );
};

export default Form;

