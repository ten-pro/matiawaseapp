import Styles from "@/styles/Sakusei.module.css";
import React, { useState , useEffect } from "react";

interface FormProps {
  onSendName: (name: string) => void
  onSendDate: (date: string) => void
  onSendTime: (time: string) => void
  onSendIcon: (icon: string) => void
}
function form(props: FormProps) {
  const [name, setname] = useState<string>('')
  // const [place_lat, setplace_lat] = useState<number>()
  // const [place_lng, setplace_lng] = useState<number>()
  const [date, setdate] = useState('')
  const [time, settime] = useState('')
  const [icon, seticon] = useState<number>()
  // const [users, setusers] = useState<number[]>([])

  function formatName(e: React.ChangeEvent<HTMLInputElement>) {
    setname(e.target.value)
    props.onSendName(e.target.value)
  }
  function formatDate(e: React.ChangeEvent<HTMLInputElement>) {
    setdate(e.target.value)
    props.onSendDate(e.target.value)
  }
  function formatTime(e: React.ChangeEvent<HTMLInputElement>) {
    settime(e.target.value)
    props.onSendTime(e.target.value)
  }
  function formatIcon(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = parseInt(e.target.value)
    seticon(value)
    props.onSendIcon(e.target.value)
  }

  // function debug() {
  //   console.log(name)
  //   console.log(date)
  //   console.log(time)
  //   console.log(icon)
  // }
  return(
    <div>
            <input type="text" placeholder="予定名" className={Styles.input} value={ name } onChange={ formatName }/>
            <input type="text" placeholder="集合場所" className={Styles.input}/>
            <input type="date" placeholder="集合日時" className={Styles.input} value={ date } onChange={ formatDate }/>
            <input type="time" placeholder="集合時間" className={Styles.input} value={ time } onChange={ formatTime }/>
            <select className={Styles.select} value={ icon } onChange={ formatIcon }>
              <option hidden value={ 0 }>予定アイコン一覧</option>
              <option value={ 1 } className={Styles.op}>食事</option>
              <option value={ 2 } className={Styles.op}>旅行</option>
              <option value={ 3 } className={Styles.op}>イベント</option>
            </select>
            <select className={Styles.frend}>
              <option value={1}></option>
            </select>
            {/* <button onClick={ debug }>debug1</button> */}
    </div>
  )
}
export default form;

// 北緯35.681042, 東経139.767214