import React, { ReactElement } from 'react';
import './button.css';

interface Props {
  text: string | ReactElement;
  onClick?: () => void;
  className?: string;
}

export function Button(props: Props): JSX.Element {
  return (
    <button onClick={props.onClick} className={props.className}>
      {props.text}
    </button>
  );
}
