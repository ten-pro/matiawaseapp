import Styles from "@/styles/Mypage.module.css";
import { useState } from "react";

interface User {
  user_name: string;
  user_mail: string;
}

interface Props {
  user_name: string;
  user_mail: string;
  onUserUpdate: (updatedUser: User) => void;
}

const Mypageinput: React.FC<Props> = ({ user_name, user_mail, onUserUpdate }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    onUserUpdate({ ...{ user_name, user_mail }, [name]: value });
  };

  return (
    <div>
      <input type="text" name="user_name" value={user_name} onChange={handleInputChange} placeholder={user_name} className={Styles.input1}/>
      <input type="text" name="user_mail" value={user_mail} onChange={handleInputChange} placeholder={user_mail} className={Styles.input1}/>
    </div>
  );
};
export default Mypageinput;