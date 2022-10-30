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
  const [count, setCount] = useState(0);
  console.log('APP', count)
  return (
    <context.Provider value={count}>
      <updateContext.Provider value={setCount}>
        <h1>Demo5</h1>
        <Middle />
      </updateContext.Provider>
    </context.Provider>
  );
}

function Middle() {
  console.log('Middle')
  return (
    <div>
      <Button />
      <Display />
    </div>
  )
}

function Button() {
  console.log('Button')
  const setCount = useContext(updateContext);
  return <button onClick={() => setCount(4)}>Update</button>;
}

function Display() {
  const count = useContext(context);
  console.log('Display', count)
  return (
    <div>{ count }</div>
  )
}