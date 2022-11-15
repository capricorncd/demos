import {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  memo,
} from 'react';

const context = createContext(0);
const updateContext = createContext<Dispatch<SetStateAction<number>>>(() => {});

export function Demo6() {
  const [state, setState] = useState(0);
  console.count('Demo6');
  return (
    <context.Provider value={state}>
      <updateContext.Provider value={setState}>
        <h1>Demo6 context</h1>
        <p>memo</p>
        <Middle />
      </updateContext.Provider>
    </context.Provider>
  );
}

const Middle = memo(() => {
  console.count('Middle');
  return (
    <div>
      <Button />
      <Display />
    </div>
  );
});

function Button() {
  console.count('Button');
  const setCount = useContext(updateContext);
  return <button onClick={() => setCount(Math.random())}>Update</button>;
}

function Display() {
  const state = useContext(context);
  console.count('Display');
  return <div>Display {state}</div>;
}
