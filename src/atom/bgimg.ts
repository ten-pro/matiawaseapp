// atoms.ts
import { atom } from 'jotai';

export const nowBgimg = atom<number>(0);
export const maxTime = atom<number>(60);
export const nowTime = atom<number>(60);
export const timeOut = atom<boolean>(false);


