import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'expo-router';
import { AppMode, ModeContextType } from '../types';
import { modeConfigs } from '../config/modes';

// 1. Create the context with a null default value
const ModeContext = createContext<ModeContextType | null>(null);

// 2. Create the Provider component to manage and supply the state
export const ModeProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Manage the active mode state, initialized to the mode matching the current route or "tracker" as fallback
  const [activeMode, setActiveMode] = useState<AppMode>(() => {
    const matchedMode = (Object.keys(modeConfigs) as AppMode[]).find(
      (m) => pathname.startsWith(modeConfigs[m].route)
    );
    return matchedMode || "tracker";
  });

  // Sync activeMode with the pathname whenever it changes (e.g., deep links, navigation)
  useEffect(() => {
    const matchedMode = (Object.keys(modeConfigs) as AppMode[]).find(
      (m) => pathname.startsWith(modeConfigs[m].route)
    );
    
    // Only update if we found a valid mode and it differs from the current state
    if (matchedMode && matchedMode !== activeMode) {
      setActiveMode(matchedMode);
    }
  }, [pathname, activeMode]);

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
