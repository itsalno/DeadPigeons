import {atom} from "jotai";
import {PlayerDTO} from "../myApi.ts";

export const PlayerAtom = atom<PlayerDTO[]>([]);
//a