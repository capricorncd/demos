/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 23:06 (GMT+0900)
 */
import React from "react";

export type AnyObject = Record<string, any>;

export type ClickFunction = (e: React.MouseEvent) => void;

export interface DefaultProps {
  className?: string;
  onClick?: ClickFunction;
  children?: string | number | JSX.Element;
  styles?: AnyObject;
}
