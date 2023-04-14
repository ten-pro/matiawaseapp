import React from "react";
import { Inter } from 'next/font/google'
import Styles from '@/styles/map/ScheduleListComponent.module.css'
import Image from "next/image";

interface ScheduleProps {
    onSchedule: () => void;
    schedules: {
        date: string;
        plan: string;
    }[];
}

const ScheduleListComponent: React.FC<ScheduleProps> = ({ onSchedule, schedules }) => {
    
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
        <Image className={Styles.close} src="/images/map/close.svg" alt="close" width={20} height={20} onClick={onSchedule}/>
    </div>
</div>

);
}
export default ScheduleListComponent
