import { atom } from 'jotai';

export const faces= atom<{id:number, src:string}[]>([
    {id:1, src:"/images/map/face5.svg"},
    {id:2, src:"/images/map/face4.svg"},
    {id:3, src:"/images/map/face3.svg"},
    {id:4, src:"/images/map/face2.svg"},
    {id:5, src:"/images/map/face1.svg"},
]);