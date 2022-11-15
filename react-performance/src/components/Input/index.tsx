import React, { useState } from 'react';

interface InputProps {
  name?: string;
}

export const Input: React.FC<InputProps> = (props) => {
  const [value, setValue] = useState('');

  return (
    <input
      name={props.name}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};
