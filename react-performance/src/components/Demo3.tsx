import { useState, FormEvent, ReactNode } from 'react';

export function Demo3() {
  return (
    <Demo3Wrap>
      <Input />
    </Demo3Wrap>
  );
}

function Demo3Wrap(props: { children: ReactNode}) {
  return (
    <div>
      <h1>Demo3</h1>
      {props.children}
      <SomeChild />
    </div>
  )
}

function Input() {
  const [count, setCount] = useState(0);
  console.log(count);
  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setCount(+e.currentTarget.value);
  };

  return (
    <>
      <input type="number" value={count} onChange={onChange} />
      <div>Count is {count}</div>
    </>
  )
}

function SomeChild() {
  console.log('Demo3 SomeChild');
  return <div>Demo3 SomeChild</div>;
}
