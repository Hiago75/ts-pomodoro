import React, { SetStateAction, useState } from 'react';

export interface PomodoroStateInterface {
  working: boolean;
  timeCounting: boolean;
}

export const PomodoroState = React.createContext({
  pomodoroState: {} as Partial<PomodoroStateInterface>,
  setPomodoroState: {} as React.Dispatch<SetStateAction<Partial<PomodoroStateInterface>>>,
});

interface IStore {
  children: React.ReactNode;
  value?: Partial<PomodoroStateInterface>;
}

const GlobalWorkingProvider = ({
  children,
  value = {} as PomodoroStateInterface,
}: IStore): React.ReactElement => {
  const [pomodoroState, setPomodoroState] = useState(value);

  return (
    <PomodoroState.Provider value={{ pomodoroState, setPomodoroState }}>
      {children}
    </PomodoroState.Provider>
  );
};

export default GlobalWorkingProvider;
