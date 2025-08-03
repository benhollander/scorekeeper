import { useImmerAtom } from 'jotai-immer';
import type { WritableDraft } from 'immer';
import { type PrimitiveAtom } from 'jotai';

import { type Player } from './Atoms';
import Round from './Round';
import Sandbags from './Sandbags';

const Column = ({
  addRound,
  highScore,
  numRounds,
  playerAtom,
  showSandbags,
}: {
  addRound: () => void;
  highScore: number;
  numRounds: number;
  playerAtom: PrimitiveAtom<Player>;
  showSandbags?: boolean;
}) => {
  const [player, setPlayer]: [
    Player,
    (fn: (draft: WritableDraft<Player>) => void) => unknown,
  ] = useImmerAtom(playerAtom);

  let total = player.rounds.reduce((a: number, b: number) => a + b, 0);
  if (showSandbags) {
    total -= Math.floor(player.bags / 10) * 100;
  }

  const isHighScore = total === highScore;

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
    <div className="mb-8">
      <div className="grid grid-flow-row text-center">
        <input
          onFocus={e => e.target.select()}
          className={`mb-4 text-center w-auto min-w-0 ${isHighScore && 'font-extrabold'}`}
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
      <div className="grid grid-flow-rows justify-items-center mt-3">
        {showSandbags && <Sandbags playerAtom={playerAtom} />}
        <div className="font-bold text-xl justify-self-center">{total}</div>
      </div>
    </div>
  );
};

export default Column;
