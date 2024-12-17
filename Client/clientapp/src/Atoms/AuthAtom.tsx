import { atomWithStorage } from 'jotai/utils';

export const isLoggedInAtom = atomWithStorage<boolean>("logstatus",false);