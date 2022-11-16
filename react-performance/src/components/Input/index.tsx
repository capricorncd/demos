import React, { useState, useRef } from 'react';

interface Options<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}

function usePropsValue<T>(options: Options<T>) {
  const { value, defaultValue, onChange } = options;
  const isControlled = value !== undefined;
  const update = useUpdate();

  const stateRef = useRef(isControlled ? value : defaultValue);
  if (isControlled) {
    stateRef.current = value;
  }

  const setState = (nextState: T) => {
    stateRef.current = nextState;
    update();
    onChange?.(nextState);
  };

  return [stateRef.current, setState] as const;
}

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

function useUpdate() {
  const [_, setFlag] = useState({});

  const forceUpdate = () => {
    setFlag({});
  };

  return forceUpdate;
}
