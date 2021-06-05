import React, { useContext, useState } from 'react';
import { secondsToTime } from '../../utils/seconds-to-time';
import { useInterval } from '../../hooks/use-interval';
import { PomodoroState } from '../../store/pomodoro-state-store';
import './statistics.css';

export function StatisticsPanel(): JSX.Element {
  const { pomodoroState } = useContext(PomodoroState);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const { working, timeCounting } = pomodoroState;

  useInterval(
    () => {
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCounting ? 1000 : null,
  );

  return (
    <div className="statistics-panel">
      <div className="statistic-single">
        <p>Time working</p>
        <span className="statistic-data">{secondsToTime(fullWorkingTime)}</span>
      </div>
    </div>
  );
}
