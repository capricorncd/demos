import { useState, SyntheticEvent, ReactNode } from 'react';

export function Demo4() {
  return (
    <Input>
      <SomeChild />
    </Input>
  );
}

function Input(props: { children: ReactNode }) {
  const [state, setState] = useState(0);
  console.log(state);
  const onClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    setState(Math.random());
  };

  return (
    <div>
      <h1>Demo4</h1>
      <button type="button" onClick={onClick}>
        Update
      </button>
      <div>State is {state}</div>
      {props.children}
    </div>
  );
}

function SomeChild() {
  console.log('Demo4 SomeChild');
  return <div>Demo4 SomeChild</div>;
}
