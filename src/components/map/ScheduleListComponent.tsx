import React, { useEffect } from "react";
import { Inter } from 'next/font/google'
import Styles from '@/styles/map/ScheduleListComponent.module.css'
import Image from "next/image";

interface ScheduleProps {
    onSchedule: () => void;
    schedules: {
        comment_id: number;
        emoticon_id: number;
        schedule_id: number;
        schedule_lat: string;
        schedule_lng: string;
        schedule_name: string;
        schedule_status: string;
        schedule_time: string;
    }[];
    onScheduleChange: (value: number) => void;
}

const ScheduleListComponent: React.FC<ScheduleProps> = ({ onSchedule, schedules, onScheduleChange }) => {
    
return (

<div>
    <div className={Styles.whiteBack}>
        <div className={Styles.title}>予定一覧</div>
        <div className={Styles.border}>
        {schedules.map((schedule, index) => (
            <div className={Styles.contents} key={index}>
                <img src="/svg/nifePink.svg" className={Styles.icon} />
                <div className={Styles.innerContents} onClick={()=>onScheduleChange(index)} style={{cursor: "pointer"}}>
                    <div className={Styles.date}>{schedule.schedule_time}</div>
                    <div className={Styles.plan}>{schedule.schedule_name}</div>
                </div>
            </div>
        ))}
        </div>
        <Image className={Styles.close} src="/images/map/close.svg" alt="close" width={20} height={20} onClick={onSchedule} style={{cursor: "pointer"}}/>
    </div>
</div>

);
}
export default ScheduleListComponent
