import { atom } from 'jotai';
import { Game } from '../myApi';
import { atomWithStorage } from 'jotai/utils';

export const GameAtom = atom<Game[]>([]);

export const activeGameAtom = atomWithStorage<Game | null>('activeGame', null);