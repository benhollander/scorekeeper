import { useImmerAtom } from 'jotai-immer';
import type { WritableDraft } from 'immer';
import { type PrimitiveAtom } from 'jotai';

import { type Player } from './Atoms';
import Round from './Round';
import Sandbags from './Sandbags';

const Column = ({
  addRound,
  numRounds,
  playerAtom,
  showSandbags,
}: {
  addRound: () => void;
  numRounds: number;
  playerAtom: PrimitiveAtom<Player>;
  showSandbags?: boolean;
}) => {
  const [player, setPlayer]: [
    Player,
    (fn: (draft: WritableDraft<Player>) => void) => unknown,
  ] = useImmerAtom(playerAtom);

  const updatePlayerName = (n: string) => {
    setPlayer(draft => {
      draft.name = n;
    });
  };

  const updateRound = (value: number, index: number) => {
    setPlayer(draft => {
      draft.rounds[index] = value;
    });
  };

  return (
    <div>
      <div className="grid grid-flow-row text-center">
        <input
          className="mb-4 text-center w-auto min-w-0"
          value={player.name || '#'}
          onChange={e => updatePlayerName(e.target.value)}
        />
        {Array(numRounds)
          .fill(0)
          .map((_val, i) => (
            <Round
              key={`round-${player?.name}-round-${i}`}
              value={player.rounds[i]}
              index={i}
              updateRound={updateRound}
            />
          ))}
        <button onClick={addRound}>+</button>
        <hr />
      </div>
      <div className="grid grid-flow-col justify-items-center mt-3">
        <div
          className={`font-bold text-xl justify-self-${showSandbags ? 'end' : 'center'}`}
        >
          {player.rounds.reduce((a: number, b: number) => a + b, 0) -
            Math.floor(player.bags / 10) * 100}
        </div>
        {showSandbags && <Sandbags playerAtom={playerAtom} />}
      </div>
    </div>
  );
};

export default Column;
