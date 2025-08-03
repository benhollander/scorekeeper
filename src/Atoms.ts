import { focusAtom } from 'jotai-optics';
import { atomWithStorage, splitAtom } from 'jotai/utils';

export interface Player {
  bags: number;
  name: string;
  rounds: number[];
}

export interface State {
  players: Player[];
  showSandbags?: boolean;
  numRounds: number;
}

const defaultState: State = {
  numRounds: 1,
  players: [
    {
      bags: 0,
      name: 'Us',
      rounds: [0],
    },
    {
      bags: 0,
      name: 'Them',
      rounds: [0],
    },
  ],
  showSandbags: false,
};

export const scoresAtom = atomWithStorage<State>('scores', defaultState);
export const playersAtoms = splitAtom(
  focusAtom(scoresAtom, optic => optic.prop('players')),
);
