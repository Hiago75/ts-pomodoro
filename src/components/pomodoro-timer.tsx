import React, { useEffect } from 'react';
import useSound from 'use-sound';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';
import bellStart from '../sounds/bell-start.mp3';
import bellFinish from '../sounds/bell-finish.mp3';

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = React.useState(props.pomodoroTime);
  const [timeCounting, setTimeCounting] = React.useState(false);
  const [working, setWorking] = React.useState(false);
  const [resting, setResting] = React.useState(false);
  const [playWorkSound] = useSound(bellStart);
  const [playRestSound] = useSound(bellFinish);

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');
  }, [working]);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    timeCounting ? 1000 : null,
  );

  //Start the work timer
  const configureWork = () => {
    setTimeCounting(true);
    setResting(false);
    playWorkSound();
    setWorking(true);
    setMainTime(props.pomodoroTime);
  };

  //Start the rest timer, receive an argument that defines if will be a long or a short rest time.
  const configureRest = (long: boolean) => {
    setTimeCounting(true);
    setWorking(false);
    setResting(true);
    playRestSound();

    if (long) {
      setMainTime(props.longRestTime);
    } else {
      setMainTime(props.shortRestTime);
    }
  };

  return (
    <div className="pomodoro">
      <h4>You are working</h4>
      <Timer mainTime={mainTime} />

      <div className="controls">
        <Button text="Work" onClick={() => configureWork()} />
        <Button text="Rest" onClick={() => configureRest(false)} />
        <Button
          className={!working && !resting ? 'hidden' : ''}
          text={timeCounting ? 'Pause' : 'Back to work'}
          onClick={() => setTimeCounting(!timeCounting)}
        />
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
