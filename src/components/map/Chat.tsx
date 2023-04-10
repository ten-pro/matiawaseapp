import React from "react";
import { Inter } from 'next/font/google'
import Styles from '@/styles/map/chat.module.css'
import ScheduleList from '@/components/map/ScheduleList'

const inter = Inter({ subsets: ['latin'] })

function BackGround() {
return (


<div>
    <img src="../../img/map.jpg" className={Styles.map} />
    <ScheduleList />
</div>

);
}
export default BackGround
