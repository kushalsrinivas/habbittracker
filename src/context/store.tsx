interface Activity {
  id: number;
  name: string;
  description: string;
  color: string;
  logs: Date[]; // Array of log dates
  lastLogged: Date | null;
}

interface ActivityContextType {
  activities: Activity[];

  incrementLog: (activityId: number) => void;
  addActivity: (activity: Activity) => void;
  currentStreak: () => number;
  longestStreak: () => number;
  totalLogs: () => number;
  mostLoggedActivity: () => Activity | null;
}

const initialActivities: Activity[] = [
  {
    id: 1,
    name: "Hiking",
    description: "Exploring local trails.",
    color: "#FF6347",
    logs: [],
    lastLogged: null,
  },
  {
    id: 2,
    name: "Reading",
    description: "Reading fiction and non-fiction books.",
    color: "#4682B4",
    logs: [],
    lastLogged: null,
  },
  {
    id: 3,
    name: "Cooking",
    description: "Trying out new vegetarian recipes.",
    color: "#FFD700",
    logs: [],
    lastLogged: null,
  },
  {
    id: 4,
    name: "Gardening",
    description: "Maintaining a small kitchen garden.",
    color: "#32CD32",
    logs: [],
    lastLogged: null,
  },
  {
    id: 5,
    name: "Programming",
    description: "Working on personal coding projects.",
    color: "#8A2BE2",
    logs: [],
    lastLogged: null,
  },
];

import React, { createContext, useContext, useState, ReactNode } from "react";
import { differenceInCalendarDays } from "date-fns";

const ActivityContext = createContext<ActivityContextType | undefined>(
  undefined
);

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (context === undefined) {
    throw new Error("useActivity must be used within an ActivityProvider");
  }
  return context;
};
interface ActivityProviderProps {
  children: ReactNode;
}

export const ActivityProvider: React.FC<ActivityProviderProps> = ({
  children,
}) => {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  const incrementLog = (activityId: number) => {
    const updatedActivities = activities.map((activity) => {
      if (activity.id === activityId) {
        const newLogDate = new Date(); // assumes logging at the current time
        return {
          ...activity,
          logs: [...activity.logs, newLogDate],
          lastLogged: newLogDate,
        };
      }
      return activity;
    });
    setActivities(updatedActivities);
  };

  const addActivity = (activity: Activity) => {
    setActivities([...activities, { ...activity, logs: [] }]);
  };

  interface Activity {
    id: number;
    name: string;
    description: string;
    color: string;
    logs: Date[]; // Array of log dates
    lastLogged: Date | null;
  }

  interface ActivityContextType {
    activities: Activity[];
    longestStreak: () => number;
    currentStreak: () => number;
  }

  const currentStreak = (): number => {
    let maxCurrentStreak = 0;

    const today = new Date();

    activities.forEach((activity) => {
      if (activity.logs.length > 0) {
        // Sort logs to ensure they are in chronological order
        const sortedLogs = activity.logs.sort(
          (a, b) => a.getTime() - b.getTime()
        );

        let currentStreak = 0;
        let found = false;

        // Traverse the logs from the most recent to the oldest
        for (let i = sortedLogs.length - 1; i > 0; i--) {
          if (differenceInCalendarDays(today, sortedLogs[i]) === 0) {
            found = true; // Start counting from today
            currentStreak = 1;
          } else if (
            found &&
            differenceInCalendarDays(sortedLogs[i], sortedLogs[i + 1]) === 1
          ) {
            currentStreak++;
          } else if (found) {
            break; // Stop if no longer consecutive
          }
        }

        // Update the maximum current streak found
        maxCurrentStreak = Math.max(maxCurrentStreak, currentStreak);
      }
    });

    return maxCurrentStreak;
  };

  const longestStreak = (): number => {
    let maxStreak = 0;

    activities.forEach((activity) => {
      if (activity.logs.length > 0) {
        // Sort logs to ensure they are in chronological order
        const sortedLogs = activity.logs.sort(
          (a, b) => a.getTime() - b.getTime()
        );

        let currentStreak = 1;
        let longestStreakForActivity = 1;

        for (let i = 1; i < sortedLogs.length; i++) {
          // Calculate the difference in calendar days between consecutive logs
          if (
            differenceInCalendarDays(sortedLogs[i], sortedLogs[i - 1]) === 1
          ) {
            currentStreak++;
          } else {
            currentStreak = 1; // Reset streak if not consecutive
          }
          // Update the longest streak for this activity
          longestStreakForActivity = Math.max(
            longestStreakForActivity,
            currentStreak
          );
        }

        // Update the overall maximum streak
        maxStreak = Math.max(maxStreak, longestStreakForActivity);
      }
    });

    return maxStreak;
  };

  const totalLogs = (): number => {
    return activities.reduce((acc, activity) => acc + activity.logs.length, 0);
  };

  const mostLoggedActivity = (): Activity | null => {
    if (activities.length === 0) return null;
    return activities.reduce((prev, current) =>
      prev.logs.length > current.logs.length ? prev : current
    );
  };
  return (
    <ActivityContext.Provider
      value={{
        activities,
        incrementLog,
        addActivity,
        currentStreak,
        longestStreak,
        totalLogs,
        mostLoggedActivity,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
