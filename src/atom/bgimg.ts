// atoms.ts
import { atom } from 'jotai';

export const nowBgimg = atom<number>(0);
export const maxTime = atom<number>(60);
export const nowTime = atom<number>(60);
export const timeOut = atom<boolean>(false);

export const setNowTime = atom(
  null,
  (get, set, updateFn: (prevTimer: number) => number) => {
    set(nowTime, updateFn(get(nowTime)));
  }
);

export const setMaxTime = atom(
  null,
  (get, set, value: number) => {
    set(maxTime, value);
  }
);
