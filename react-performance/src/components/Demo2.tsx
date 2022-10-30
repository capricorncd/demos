import { useState, FormEvent } from 'react';

export function Demo2() {
  return (
    <div>
      <h1>Demo2</h1>
      <Input />
      <SomeChild />
    </div>
  );
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
  );
}

function SomeChild() {
  console.log('Demo2 SomeChild');
  return <div>Demo2 SomeChild</div>;
}
