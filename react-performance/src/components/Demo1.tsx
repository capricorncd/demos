import { useState, SyntheticEvent } from 'react';

export function Demo1() {
  const [state, setState] = useState(0);
  console.count('Demo1');
  const onClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    setState(Math.random());
  };

  return (
    <div>
      <h1>Demo1</h1>
      <p>normal</p>
      <button type="button" onClick={onClick}>
        Update
      </button>
      <div>State is {state}</div>
      <SomeChild />
    </div>
  );
}

function SomeChild() {
  console.count('Demo1 SomeChild');
  return <div>Demo1 SomeChild</div>;
}
