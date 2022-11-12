import { useState, SyntheticEvent } from 'react';

export function Demo2() {
  console.count('Demo2');
  return (
    <div>
      <h1>Demo2 </h1>
      <p>Extract to a new component</p>
      <Button />
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
  console.count('Demo2 SomeChild');
  return <div>Demo2 SomeChild</div>;
}
