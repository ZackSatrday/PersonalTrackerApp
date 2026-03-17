import React, { createContext, useContext, useState } from 'react';
import { AppMode, ModeContextType } from '../types';
import { modeConfigs } from '../config/modes';

// 1. Create the context with a null default value
const ModeContext = createContext<ModeContextType | null>(null);

// 2. Create the Provider component to manage and supply the state
export const ModeProvider = ({ children }: { children: React.ReactNode }) => {
  // Manage the active mode state, defaulting to "tracker"
  const [activeMode, setActiveMode] = useState<AppMode>("tracker");

  // Derive the configuration object based on the currently active mode
  const config = modeConfigs[activeMode];

  // Provide the state and config to all children components
  return (
    <ModeContext.Provider value={{ activeMode, setActiveMode, config }}>
      {children}
    </ModeContext.Provider>
  );
};

// 3. Create a custom hook for easy access to the context
export const useMode = (): ModeContextType => {
  const context = useContext(ModeContext);
  
  // Ensure the hook is used within the provider tree
  if (!context) {
    throw new Error("useMode must be used inside ModeProvider");
  }
  
  return context;
};
