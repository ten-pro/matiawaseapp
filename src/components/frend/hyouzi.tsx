import { Inter } from 'next/font/google'
import Styles from "@/styles/Frend.module.css";
import { useState } from "react";
import React from "react";

function hyouzi(){

  const name = [
    {name:"上田"},
    {name:"上田"},
    {name:"上田"},
    {name:"上田"},
    {name:"上田"},
    {name:"上田"},
    {name:"宮川"},
    {name:"明石"}]

  return(
    <div>
      {name.map((name,index)=>
      <p className={Styles.line2} key={index}>{name.name}</p>)}
    </div>
    
  )
}
export default hyouzi;