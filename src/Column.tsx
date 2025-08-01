import { useAtom, type Atom, type WriteableAtom } from 'jotai';

import type { Player } from './Atoms';
import Round from './Round';

const Column = ({
  playerAtom,
  sandbags,
}: {
  playerAtom: WriteableAtom<Player>;
  sandbags?: boolean;
}) => {
  const [player, setPlayer] = useAtom(playerAtom);

  const updatePlayer = (key: string, value: string) => {
    setPlayer({ ...player, [key]: value });
  };

  const updateRound = (value: number, index: number) => {
    const newRounds = [...player.rounds];
    newRounds[index] = value;
    setPlayer({ ...player, rounds: newRounds})
  }
  return (
    <div className="flex flex-col text-center">
      <input
        className="mb-4 text-center font-bold"
        value={player?.name || '#'}
        onChange={e => updatePlayer('name', e.target.value)}
      />
      {player?.rounds?.map((round, i) =>
        <Round key={`round-${player?.name}-round-${i}`} value={round} index={i} updateRound={updateRound} />
      )}
      <Round value={0} index={player.rounds.length} updateRound={updateRound} />
      <hr />
      <h3 className="p-4 font-bold text-xl">
        {player?.rounds?.reduce((a: number, b: number) => a + b, 0)}
        {sandbags ? <span> / {player?.bags}</span> : null}
      </h3>
    </div>
  );
};

export default Column;
