import { atom } from 'jotai';

interface schedules {
    comment_id: number;
    emoticon_id: number;
    schedule_id: number;
    schedule_lat: string;
    schedule_lng: string;
    schedule_name: string;
    schedule_status: string;
    schedule_time: string;
}

export const schedulesAtom= atom<schedules[]>([
]);

interface appointment {
    appointment_id: number;
    appointment_status: string;
    chat_list: string[];
    partner_status: {
        user_id: number;
        user_name: string;
        appointment_status: string;
    }[];
    schedule_id: number;
}

export const appointmentAtom= atom<appointment[]>([
]);

export const schedulesStatusAtom = atom<number>(0);