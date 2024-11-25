import { atomWithStorage } from 'jotai/utils';

export const BalanceAtom = atomWithStorage<number>('userBalance', 0);
