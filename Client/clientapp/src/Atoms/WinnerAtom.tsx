import {atom} from "jotai";
import {WinnerDto} from "../myApi.ts";

export const WinnerAtom = atom<WinnerDto[]>([]);