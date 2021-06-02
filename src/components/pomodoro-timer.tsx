import React from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = React.useState(props.pomodoroTime);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);

  return (
    <div className="pomodoro">
      <h4>You are working</h4>
      <Timer mainTime={mainTime} />

      <div className="controls">
        <Button text="teste" />
        <Button text="teste" />
        <Button text="teste" />
      </div>

      <div className="details">
        <p>Testando: Eu sou um teste muito legal mesmo</p>
        <p>Testando: Eu sou um teste muito legal mesmo</p>
        <p>Testando: Eu sou um teste muito legal mesmo</p>
        <p>Testando: Eu sou um teste muito legal mesmo</p>
      </div>
    </div>
  );
}
