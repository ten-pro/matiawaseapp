import Styles from "@/styles/Frend.module.css";
import { useState } from "react";

type ChildComponentProps = {
  inputValue: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Frendinput = ({ inputValue, onInputChange }: ChildComponentProps) => {

  return (
    <div>
      <input 
      type="text" 
      placeholder="相手のID（半角入力）" 
      className={Styles.input}
      value={inputValue} 
      onChange={onInputChange}/>
    </div>
  );
};
export default Frendinput;