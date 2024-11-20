import { atom } from "jotai";
import { BalanceDTO } from "../myApi";

export const TransactionsAtom = atom<BalanceDTO[]>([]);