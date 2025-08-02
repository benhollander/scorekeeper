import { useAtom } from 'jotai';

import Column from './Column';
import Navbar from './Navbar';
import { scoresAtom, playersAtoms } from './Atoms';
import { useImmerAtom } from 'jotai-immer';

export const App = () => {
  const [players] = useAtom(playersAtoms);
  const [scores, setScores] = useImmerAtom(scoresAtom);

  const incRounds = () => {
    setScores(draft => {
      ++draft.numRounds;
    });
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="grid grid-flow-col-dense gap-4">
        {players.map((playerAtom, i) => (
          <Column
            addRound={incRounds}
            showSandbags={scores?.showSandbags}
            playerAtom={playerAtom}
            key={`${playerAtom.toString()}-${i}`}
            numRounds={scores.numRounds}
          />
        ))}
      </div>
    </>
  );
};

export default App;
