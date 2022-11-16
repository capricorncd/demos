/**
 * A Controlled Component
 * is one that takes its current value through props and notifies changes through callbacks like onChange. A parent component "controls" it by handling the callback and managing its own state and passing the new values as props to the controlled component. You could also call this a "dumb component".
 * 
 * An Uncontrolled Component
 * is one that stores its own state internally, and you query the DOM using a ref to find its current value when you need it. This is a bit more like traditional HTML.
 * 
 * Controlled:
 * <input type="text" value={value} onChange={handleChange} />
 * 
 * Uncontrolled:
 * <input type="text" defaultValue="foo" ref={inputRef} />
 * Use `inputRef.current.value` to read the current value of <input>
 */
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
