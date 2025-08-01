import { Fragment } from 'react';
import {
  Field,
  Label,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Switch,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { RESET } from 'jotai/utils';
import { useAtom } from 'jotai';
import { scoresAtom } from './Atoms';

export default function Example() {
  const [scores, setScores] = useAtom(scoresAtom);

  const addPlayer = () =>
    setScores({ players: [...scores.players, { name: '#', rounds: [0] }] });
  const removePlayer = () => {
    const newPlayers = [...scores.players];
    newPlayers.pop();
    setScores({ players: newPlayers });
  };
  const toggleSandbags = () =>
    setScores({ ...scores, sandbags: !scores.sandbags });

  return (
    <Menu as="nav" className="bg-base-300 p-4 mb-4">
      <MenuButton as={Fragment}>
        {({ active }) =>
          active ? (
            <XMarkIcon className="size-6 group-data-open:block" />
          ) : (
            <Bars3Icon
              aria-hidden="true"
              className="block size-6 group-data-open:hidden"
            />
          )
        }
      </MenuButton>
      <MenuItems anchor="bottom" className="bg-base-300 p-4 rounded-b-sm">
        <MenuItem>
          <button onClick={() => setScores(RESET)} className="block mb-4">
            New Game
          </button>
        </MenuItem>
        <MenuItem>
          <>
            Players
            <button
              onClick={removePlayer}
              className="py-1 px-4 bg-accent-content ml-4 rounded-l text-white"
            >
              -
            </button>
            <button
              onClick={addPlayer}
              className="py-1 px-4 bg-accent-content mb-4 rounded-r text-white"
            >
              +
            </button>
          </>
        </MenuItem>
        <MenuItem>
          <Field>
            <Label className="mr-4">Use Sandbags</Label>
            <Switch
              onChange={toggleSandbags}
              className="group inline-flex h-6 w-11 items-center rounded-full bg-white/10 transition data-checked:bg-blue-600"
            >
              <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
            </Switch>
          </Field>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
