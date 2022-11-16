import React, { useState, useRef } from 'react';

interface InputProps {
  name?: string;
  value?: string;
  onChange: (value: string) => void;
}

/**
 * 最简单的方案：内外两个状态，手动同步
 *
 * 受控模式下存在两个问题:
 * 1.原子性：Child 内部状态的更新会比 Parent 组件晚一个渲染周期，存在 tearing 的问题
 * 2.性能：因为是在 useEffect 中通过 setState 来做的状态同步，所以会额外的触发一次渲染，存在性能问题
 * @param props InputProps
 * @returns React.FC<InputProps>
 */
export const Input: React.FC<InputProps> = (props) => {
  const { value, onChange } = props;

  const isControlled = value !== undefined;

  const stateRef = useRef(value);
  if (isControlled) {
    stateRef.current = value;
  }

  const [_, setFlag] = useState({});

  const forceUpdate = () => {
    setFlag({});
  };

  // useEffect(() => {
  //   // 在 useEffect 做状态同步
  //   // 会额外的多触发一次 Child 组件的重渲染
  //   // 组件比较简单的话，那出现的性能影响可以忽略不计
  //   // 但是对于一些复杂的组件（例如 Picker），多渲染一次带来的性能问题就比较严重
  //   if (isControlled) {
  //     setState(value);
  //   }
  // });

  // 如果组件此时处于受控模式，直接使用来自外部的状态
  // 即便状态的同步是存在延迟，但是 Child 组件所使用到的值一定是最新的
  const finalState = isControlled ? value : stateRef.current;

  return (
    <input
      name={props.name}
      value={finalState}
      onChange={(e) => {
        stateRef.current = e.target.value;
        forceUpdate();
        onChange(e.target.value);
      }}
    />
  );
};
