import { useState } from 'react';

export function Demo8() {
  console.count('Demo8');
  return (
    <div>
      <h1>Demo8</h1>
      <p>normal: Simulate time-consuming components</p>
      <Button />
      <OtherComponent />
    </div>
  );
}

function Button() {
  console.count('Button');
  const [state, setState] = useState(0);
  return (
    <>
      <button onClick={() => setState(Math.random())}>Update</button>
      <div>Display {state}</div>
    </>
  );
}

function OtherComponent() {
  console.time('OtherComponent');
  const now = performance.now();
  while (performance.now() - now < 100) {
    // do something
  }
  console.timeEnd('OtherComponent');
  return <OtherComponentChild />;
}

function OtherComponentChild() {
  console.time('OtherComponentChild');
  const now = performance.now();
  while (performance.now() - now < 100) {
    // do something
  }
  console.timeEnd('OtherComponentChild');
  return <OtherComponentGrandChild />;
}

function OtherComponentGrandChild() {
  console.time('OtherComponentGrandChild');
  const now = performance.now();
  while (performance.now() - now < 100) {
    // do something
  }
  console.timeEnd('OtherComponentGrandChild');
  return <p>OtherComponentGrandChild</p>;
}
