import type { PrimitiveAtom } from 'jotai';

import type { Player } from './Atoms';
import { useImmerAtom } from 'jotai-immer';

const Sandbags = ({ playerAtom }: { playerAtom: PrimitiveAtom<Player> }) => {
  const [player, setPlayer] = useImmerAtom(playerAtom);

  const incSandbags = () => {
    setPlayer(draft => {
      ++draft.bags;
    });
  };
  const decSandbags = () => {
    setPlayer(draft => {
      --draft.bags;
    });
  };

  return (
    <div className="bg-accent-content text-white p-1 rounded justify-self-center mb-4">
      <p className="text-xs text-base-100/65">SANDBAGS</p>
      <p className="text-center">
        <button onClick={decSandbags} className="mr-2 px-1">
          -
        </button>
        {player.bags}
        <button onClick={incSandbags} className="ml-2 px-1">
          +
        </button>
      </p>
    </div>
  );
};

export default Sandbags;
