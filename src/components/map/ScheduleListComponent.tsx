import React from "react";
import { Inter } from 'next/font/google'
import Styles from '@/styles/map/ScheduleListComponent.module.css'

const inter = Inter({ subsets: ['latin'] })

function BackGround() {
    const schedules = [
        { date: '2023/12/31 12:34', plan: '旅行' },
        { date: '2023/12/31 15:00', plan: '会議' },
        { date: '2023/12/31 18:00', plan: '打ち上げ' },
        { date: '2023/12/31 18:00', plan: '会食' },
        { date: '2023/12/31 18:00', plan: '飲み会' },
        { date: '2023/12/31 18:00', plan: '仕事' },
        { date: '2023/12/31 18:00', plan: 'プレゼン' },
      ];
return (

<div>
    <div className={Styles.whiteBack}>
        <div className={Styles.title}>予定一覧</div>
        <div className={Styles.border}>
        {schedules.map((schedule, index) => (
        <div className={Styles.contents} key={index}>
        <img src="/svg/nifePink.svg" className={Styles.icon} />
        <div className={Styles.innerContents}>
            <div className={Styles.date}>{schedule.date}</div>
            <div className={Styles.plan}>{schedule.plan}</div>
        </div>
        </div>
        ))}
        </div>
    </div>
    <div className={Styles.close}>×</div>
</div>

);
}
export default BackGround
