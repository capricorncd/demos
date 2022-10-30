import { useState, FormEvent } from 'react';

export function Demo1() {
  const [count, setCount] = useState(0);
  console.log(count);
  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setCount(+e.currentTarget.value);
  };

  return (
    <div>
      <h1>Demo1</h1>
      <input type="number" value={count} onChange={onChange} />
      <div>Count is {count}</div>
      <SomeChild />
    </div>
  );
}

function SomeChild() {
  console.log('Demo1 SomeChild');
  return <div>Demo1 SomeChild</div>;
}
