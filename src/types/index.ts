/**
 * Represents the three primary operational modes available within the application.
 */
export type AppMode = "tracker" | "timer" | "scheduler";

/**
 * Configuration schema for a specific application mode.
 * Defines the visual styling, routing, navigation structure, and the AI persona for that mode.
 */
export interface ModeConfig {
  name: string;
  route: string;
  primaryColor: string;
  backgroundColor: string;
  icon: string;
  bottomNav: string[];
  aiPersona: string;
}

/**
 * The context values provided by the application's mode state manager.
 * Supplies the current active mode, the function to change it, and the mode's configuration.
 */
export interface ModeContextType {
  activeMode: AppMode;
  setActiveMode: (mode: AppMode) => void;
  config: ModeConfig;
}
