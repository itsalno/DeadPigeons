import { Game } from '../myApi';
import { atomWithStorage } from 'jotai/utils';

export const activeGameAtom = atomWithStorage<Game | null>('activeGame', null);