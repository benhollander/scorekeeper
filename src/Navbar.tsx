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
import { useResetAtom } from 'jotai/utils';
import { scoresAtom } from './Atoms';
import { useImmerAtom } from 'jotai-immer';
import { logoString } from './assets/logo';

export default function Example() {
  const [scores, setScores] = useImmerAtom(scoresAtom);
  const resetScores = useResetAtom(scoresAtom);

  const addPlayer = () => {
    setScores(draft => {
      draft.players.push({ name: '#', rounds: [0], bags: 0 });
    });
  };

  const removePlayer = () => {
    setScores(draft => {
      draft.players.pop();
    });
  };

  const toggleSandbags = () => {
    setScores(draft => {
      draft.showSandbags = !draft.showSandbags;
    });
  };

  return (
    <Menu as="nav" className="bg-base-300 p-4 mb-4 grid grid-flow-col">
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
      <MenuItems
        anchor="bottom"
        className="bg-base-300 p-4 rounded-b-smorigin-top transition duration-200 ease-out origin-top data-closed:scale-y-0"
        transition
      >
        <MenuItem>
          <button onClick={resetScores} className="block mb-4">
            New Game
          </button>
        </MenuItem>
        <MenuItem as={Fragment}>
          {() => (
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
          )}
        </MenuItem>
        <MenuItem>
          <Field>
            <Label className="mr-4">Use Sandbags</Label>
            <Switch
              checked={scores.showSandbags}
              className="group inline-flex h-6 w-11 items-center rounded-full bg-white/10 transition data-checked:bg-blue-600"
              onChange={toggleSandbags}
            >
              <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
            </Switch>
          </Field>
        </MenuItem>
      </MenuItems>
      <div className="text-base-100 font-bold justify-self-center">SCOREKEEPER</div>
      <img src={logoString} className="h-6 justify-self-end" />
    </Menu>
  );
}
