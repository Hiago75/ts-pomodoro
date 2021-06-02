import React, { useEffect, useState, useCallback } from 'react';
import './pomodoro-timer.css';
import useSound from 'use-sound';
import { useInterval } from '../../hooks/use-interval';
import { Button } from '../Button';
import { Timer } from '../Timer';
import bellStart from '../../sounds/bell-start.mp3';
import bellFinish from '../../sounds/bell-finish.mp3';
import { secondsToTime } from '../../utils/seconds-to-time';

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.pomodoroTime);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [cyclesQtdManager, setCyclesQtdManager] = useState(new Array(props.cycles - 1).fill(true));

  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  const [playWorkSound] = useSound(bellStart);
  const [playRestSound] = useSound(bellFinish);

  //Set the interval for every second
  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCounting ? 1000 : null,
  );

  //Start the work timer
  const configureWork = useCallback(() => {
    setTimeCounting(true);
    setResting(false);
    playWorkSound();
    setWorking(true);
    setMainTime(props.pomodoroTime);
  }, [setTimeCounting, setResting, playWorkSound, setWorking, setMainTime, props.pomodoroTime]);

  //Start the rest timer, receive an argument that defines if will be a long or a short rest time.
  const configureRest = useCallback(
    (long: boolean) => {
      setTimeCounting(true);
      setWorking(false);
      setResting(true);
      playRestSound();

      if (long) {
        setMainTime(props.longRestTime);
      } else {
        setMainTime(props.shortRestTime);
      }
    },
    [
      setTimeCounting,
      setWorking,
      setResting,
      playRestSound,
      setMainTime,
      props.longRestTime,
      props.shortRestTime,
    ],
  );

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');

    if (mainTime > 0) return;

    if (working && cyclesQtdManager.length > 0) {
      configureRest(false);
      cyclesQtdManager.pop();
    } else if (working && cyclesQtdManager.length <= 0) {
      configureRest(true);
      setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (resting) configureWork();
  }, [
    working,
    resting,
    mainTime,
    cyclesQtdManager,
    numberOfPomodoros,
    completedCycles,
    configureRest,
    setCyclesQtdManager,
    setNumberOfPomodoros,
    configureWork,
    props.cycles,
  ]);

  return (
    <div className="pomodoro">
      <h4>It`s time to {working ? 'work' : 'rest'}</h4>
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
        <p>Completed cycles: {completedCycles}</p>
        <p>Hours working: {secondsToTime(fullWorkingTime)}</p>
        <p>Completed pomodoros: {numberOfPomodoros}</p>
      </div>
    </div>
  );
}
