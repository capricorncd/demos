import { useState, useRef, SetStateAction, useCallback } from 'react';

export interface Options<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}

export function usePropsValue<T>(options: Options<T>) {
  const { value, defaultValue, onChange } = options;
  const isControlled = value !== undefined;
  const update = useUpdate();

  const stateRef = useRef(isControlled ? value : defaultValue);
  if (isControlled) {
    stateRef.current = value;
  }

  const setState = (v: SetStateAction<T>) => {
    const nextState =
      typeof v === 'function'
        ? (v as (prevState: T) => T)(stateRef.current as T)
        : v;
    if (nextState === stateRef.current) return;
    stateRef.current = nextState;
    update();
    onChange?.(nextState);
  };

  return [stateRef.current, setState] as const;
}

function useUpdate() {
  const [, setFlag] = useState({});
  return useCallback(() => setFlag({}), []);
}
