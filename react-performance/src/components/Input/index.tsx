import React, { useState, useEffect } from 'react';

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
  const { value, onChange } = props
  const [state, setState] = useState(value);

  const isControlled = value !== undefined

  useEffect(() => {
    if (isControlled) {
      setState(value)
    }
  })

  return (
    <input
      name={props.name}
      value={state}
      onChange={(e) => {
        if (!isControlled) {
          setState(e.target.value)
        }
        onChange(e.target.value);
      }}
    />
  );
};
