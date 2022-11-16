import React from 'react';
import { Options, usePropsValue } from './usePropsValue';

interface InputProps extends Options<string> {
  name?: string;
}

export const Input: React.FC<InputProps> = (props) => {
  const [state, setState] = usePropsValue(props);

  return (
    <input
      name={props.name}
      value={state}
      onChange={(e) => {
        setState(e.target.value);
      }}
    />
  );
};
