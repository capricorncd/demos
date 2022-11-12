import { useState, SyntheticEvent } from 'react';

export function Demo2() {
  return (
    <div>
      <h1>Demo2 </h1>
      <Input />
      <SomeChild />
    </div>
  );
}

function Input() {
  const [state, setState] = useState(0);
  console.log(state);
  const onClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    setState(Math.random());
  };

  return (
    <>
      <button type="button" onClick={onClick}>
        Update
      </button>
      <div>State is {state}</div>
    </>
  );
}

function SomeChild() {
  console.log('Demo2 SomeChild');
  return <div>Demo2 SomeChild</div>;
}
