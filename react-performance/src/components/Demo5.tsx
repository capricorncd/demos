import {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';

const context = createContext(0);
const updateContext = createContext<Dispatch<SetStateAction<number>>>(() => {});

export function Demo5() {
  const [state, setState] = useState(0);
  console.log('APP', state);
  return (
    <context.Provider value={state}>
      <updateContext.Provider value={setState}>
        <h1>Demo5 context</h1>
        <Middle />
      </updateContext.Provider>
    </context.Provider>
  );
}

function Middle() {
  console.log('Middle');
  return (
    <div>
      <Button />
      <Display />
    </div>
  );
}

function Button() {
  console.log('Button');
  const setCount = useContext(updateContext);
  return <button onClick={() => setCount(Math.random())}>Update</button>;
}

function Display() {
  const state = useContext(context);
  console.log('Display', state);
  return <div>Display {state}</div>;
}
