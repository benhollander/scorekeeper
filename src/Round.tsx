import { useAtom } from 'jotai';

import type { Atom } from 'jotai';

const Round = ({
  value,
  index,
  updateRound,
}: {
  value: number;
  index: number;
  updateRound: (e: number, i: number) => void;
}) => {
  return (
    <input
      className="text-center"
      type="number"
      value={value}
      onChange={e => updateRound(parseInt(e.target.value, 10), index)}
      onBlur={e => updateRound(parseInt(e.target.value, 10), index)}
    />
  );
};

export default Round;
