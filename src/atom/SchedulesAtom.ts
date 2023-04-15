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