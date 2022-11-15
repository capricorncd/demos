import {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useMemo,
} from 'react';

const context = createContext(0);
const updateContext = createContext<Dispatch<SetStateAction<number>>>(() => {});

export function Demo7() {
  const [state, setState] = useState(0);
  console.count('Demo7');
  return (
    <context.Provider value={state}>
      <updateContext.Provider value={setState}>
        <h1>Demo7 context</h1>
        <p>useMemo</p>
        <Middle />
      </updateContext.Provider>
    </context.Provider>
  );
}

function Middle() {
  console.count('Middle');
  return useMemo(() => {
    return (
      <div>
        <Button />
        <Display />
      </div>
    );
  }, []);
}

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
