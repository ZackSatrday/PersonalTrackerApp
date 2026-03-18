import { AppMode, ModeConfig } from '../types';

export const modeConfigs: Record<AppMode, ModeConfig> = {
  tracker: {
    name: "Tracker",
    route: "/tracker",
    primaryColor: "#4CAF50",
    backgroundColor: "#F1F8F1",
    icon: "📊",
    bottomNav: ["Today", "History", "Insights", "Settings"],
    aiPersona: "habit coach"
  },
  timer: {
    name: "Timer",
    route: "/timer",
    primaryColor: "#2196F3",
    backgroundColor: "#F0F6FF",
    icon: "⏱️",
    bottomNav: ["Workout", "History", "Presets", "Settings"],
    aiPersona: "fitness trainer"
  },
  scheduler: {
    name: "Scheduler",
    route: "/scheduler",
    primaryColor: "#9C27B0",
    backgroundColor: "#F8F0FF",
    icon: "📅",
    bottomNav: ["Today", "Calendar", "Reminders", "Settings"],
    aiPersona: "personal assistant"
  }
};
