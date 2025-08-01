import { withImmer } from 'jotai-immer';
import { focusAtom } from 'jotai-optics';
import { atomWithStorage, splitAtom } from 'jotai/utils';

export interface Player {
  bags?: number;
  display: boolean;
  name: string;
  rounds?: number[];
}

export interface State {
  players: Player[];
  sandbags?: boolean;
}

const defaultState: State = {
  players: [
    {
      bags: 0,
      display: true,
      name: 'Us',
      rounds: [0],
    },
    {
      bags: 0,
      display: true,
      name: 'Them',
      rounds: [0],
    },
  ],
  sandbags: false,
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

export const scoresAtom = withImmer(atomWithStorage<State>('scores', defaultState));

export const playersAtoms = splitAtom(
  focusAtom(scoresAtom, optic => optic.prop('players')),
);
