import { Inter } from 'next/font/google'
import Styles from "@/styles/Frend.module.css";
import { useState } from "react";
import React from "react";

type Name = { name: string };

interface ChildComponentProps {
  names: Name[];
}

const hyouzi: React.FC<ChildComponentProps> = ({ names }) => {

  

  return(
    <div>
      {names.map((name,index)=>
      <p className={Styles.line2} key={index}>{name.name}</p>)}
    </div>
  )
}
export default hyouzi;