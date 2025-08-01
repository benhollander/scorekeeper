import { useAtom, useAtomValue } from 'jotai';

import Column from './Column';
import Navbar from './Navbar';
import { scoresAtom, playersAtoms } from './Atoms';

export const App = () => {
  const [players] = useAtom(playersAtoms);
  const [scores] = useAtom(scoresAtom);

  return (
    <>
      <Navbar></Navbar>
      <div className="flex justify-items-center-safe justify-center">
        {players.map((playerAtom, i) => (
          <Column
            sandbags={scores?.sandbags}
            playerAtom={playerAtom}
            key={`${playerAtom.toString()}-${i}`}
          />
        ))}
      </div>
    </>
  );
};

export default App;
