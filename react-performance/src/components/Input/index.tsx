import React from 'react';

interface InputProps {
  name?: string;
  value: string;
  onChange: (value: string) => void;
}

export const Input: React.FC<InputProps> = (props) => {
  const { value, onChange } = props
  return (
    <input
      name={props.name}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
};
