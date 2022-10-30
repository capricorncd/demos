import { useState, FormEvent, ReactNode } from 'react';

export function Demo4() {
  return (
    <Input>
      <SomeChild />
    </Input>
  );
}

function Input(props: { children: ReactNode }) {
  const [count, setCount] = useState(0);
  console.log(count);
  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setCount(+e.currentTarget.value);
  };

  return (
    <div>
      <h1>Demo4</h1>
      <input type="number" value={count} onChange={onChange} />
      <div>Count is {count}</div>
      {props.children}
    </div>
  )
}

function SomeChild() {
  console.log('Demo4 SomeChild');
  return <div>Demo4 SomeChild</div>;
}
