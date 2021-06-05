import React, { useEffect, useState, useCallback, useContext } from 'react';
import { FaPlay, FaPause, FaUndo } from 'react-icons/fa';
import { MdSnooze } from 'react-icons/md';
import './pomodoro-timer.css';
import useSound from 'use-sound';
import { useInterval } from '../../hooks/use-interval';
import { Button } from '../Button';
import { Timer } from '../Timer';
import bellStart from '../../sounds/bell-start.mp3';
import bellFinish from '../../sounds/bell-finish.mp3';
import { secondsToMinutes } from '../../utils/seconds-to-minutes';
import { PomodoroState } from '../../store/pomodoro-state-store';

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.pomodoroTime);
  const [wasCalled, setWasCalled] = useState(0);
  const { pomodoroState, setPomodoroState } = useContext(PomodoroState);
  const { working, timeCounting } = pomodoroState;
  const [resting, setResting] = useState(false);

  const [cyclesQtdManager, setCyclesQtdManager] = useState(new Array(props.cycles - 1).fill(true));
  const [completedCycles, setCompletedCycles] = useState(0);

  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  const [playWorkSound] = useSound(bellStart);
  const [playRestSound] = useSound(bellFinish);

  //Set the interval for every second
  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    timeCounting ? 1000 : null,
  );

  //Start the work timer
  const configureWork = useCallback(() => {
    setResting(false);
    playWorkSound();
    setPomodoroState({ working: true, timeCounting: true });
    setMainTime(props.pomodoroTime);
  }, [setResting, playWorkSound, setPomodoroState, setMainTime, props.pomodoroTime]);

  const startButtonHandler = () => {
    if (wasCalled === 0) {
      configureWork();
      setWasCalled(1);
    } else {
      setPomodoroState({ working: working, timeCounting: !timeCounting });
    }
  };

  //Start the rest timer, receive an argument that defines if will be a long or a short rest time.
  const configureRest = useCallback(
    (long: boolean) => {
      setPomodoroState({ working: false, timeCounting: true });
      setResting(true);
      playRestSound();

      if (long) {
        setMainTime(props.longRestTime);
      } else {
        setMainTime(props.shortRestTime);
      }
    },
    [setResting, playRestSound, setMainTime, props.longRestTime, props.shortRestTime],
  );

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');

    if (working || resting)
      document.title = `${secondsToMinutes(mainTime)} - ${
        working ? 'Time to work' : 'Time to rest'
      } `;

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
      <h4>It's time to {working ? 'work' : 'rest'}</h4>
      <Timer mainTime={mainTime} />

      <div className="controls">
        <Button
          text={<MdSnooze className="react-icons" />}
          onClick={() => configureRest(false)}
        ></Button>
        <Button
          className="main-btn"
          text={
            !timeCounting ? <FaPlay className="react-icons" /> : <FaPause className="react-icons" />
          }
          onClick={() => startButtonHandler()}
        />
        <Button text={<FaUndo className="react-icons" />} onClick={() => configureWork()}></Button>
      </div>
    </div>
  );
}
