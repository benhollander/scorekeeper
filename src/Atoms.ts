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

// const countReducer = (prev, action) => {
//   if (action.type === 'inc') return prev + 1
//   if (action.type === 'dec') return prev - 1
//   throw new Error('unknown action type')
// }

// const playerReducer = (prev, action) => {
//   if (action.type === 'toggle') {
//     return {...prev, display: !prev.display}
//   }
//   if (action.type === '')
// }

export const scoresAtom = atomWithStorage<State>('scores', defaultState);

export const playersAtoms = splitAtom(
  focusAtom(scoresAtom, optic => optic.prop('players')),
);
