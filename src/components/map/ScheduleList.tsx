import React from "react";
import { Inter } from 'next/font/google'
import Styles from '@/styles/map/ScheduleList.module.css'
import ScheduleListComponent from '@/components/map/ScheduleListComponent'

const inter = Inter({ subsets: ['latin'] })

function BackGround() {
return (


<div>
    <img src="../../img/map.jpg" className={Styles.map} />
    <ScheduleListComponent />
</div>

);
}
export default BackGround
