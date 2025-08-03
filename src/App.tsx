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

  const highScore = Math.max(
    ...scores.players.map(player => {
      let total = player.rounds.reduce((a: number, b: number) => a + b, 0);
      if (scores.showSandbags) {
        total -= Math.floor(player.bags / 10) * 100;
      }
      return total;
    }),
  );

  return (
    <>
      <Navbar></Navbar>
      <div className="grid grid-flow-rows grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {players.map((playerAtom, i) => (
          <Column
            highScore={highScore}
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
