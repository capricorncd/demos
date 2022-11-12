import { useState, SyntheticEvent, ReactNode } from 'react';

export function Demo3() {
  return (
    <Demo3Wrap>
      <Input />
    </Demo3Wrap>
  );
}

function Demo3Wrap(props: { children: ReactNode }) {
  return (
    <div>
      <h1>Demo3</h1>
      {props.children}
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
  console.log('Demo3 SomeChild');
  return <div>Demo3 SomeChild</div>;
}
