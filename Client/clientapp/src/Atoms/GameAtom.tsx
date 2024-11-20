import { atom } from 'jotai';
import { Game } from '../myApi';

export const activeGameAtom = atom<Game>();