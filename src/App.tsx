import React from 'react';
import { PomodoroTimer } from './components/PomodoroTimer';
import { StatisticsPanel } from './components/StatisticsPanel';
import GlobalWorkingProvider from './store/pomodoro-state-store';

function App(): JSX.Element {
  return (
    <GlobalWorkingProvider>
      <div className="container">
        <StatisticsPanel />
        <PomodoroTimer pomodoroTime={1500} shortRestTime={300} longRestTime={900} cycles={4} />
      </div>
    </GlobalWorkingProvider>
  );
}

export default App;
