import { useState, SyntheticEvent, ReactNode } from 'react';

export function Demo4() {
  console.count('Demo4');
  return (
    <Button>
      <SomeChild />
    </Button>
  );
}

function Button(props: { children: ReactNode }) {
  const [state, setState] = useState(0);
  console.count('Button');
  const onClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    setState(Math.random());
  };

  return (
    <div>
      <h1>Demo4</h1>
      <p>props.children</p>
      <button type="button" onClick={onClick}>
        Update
      </button>
      <div>State is {state}</div>
      {props.children}
    </div>
  );
}

function SomeChild() {
  console.count('Demo4 SomeChild');
  return <div>Demo4 SomeChild</div>;
}
