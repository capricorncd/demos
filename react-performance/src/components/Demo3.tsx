import { useState, SyntheticEvent, ReactNode } from 'react';

export function Demo3() {
  console.count('Demo3');
  return (
    <Demo3Wrap>
      <Button />
    </Demo3Wrap>
  );
}

function Demo3Wrap(props: { children: ReactNode }) {
  console.count('Demo3Wrap');
  return (
    <div>
      <h1>Demo3</h1>
      <p>props.children</p>
      {props.children}
      <SomeChild />
    </div>
  );
}

function Button() {
  const [state, setState] = useState(0);
  console.count('Button');
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
  console.count('Demo3 SomeChild');
  return <div>Demo3 SomeChild</div>;
}
