interface Activity {
  id: number;
  name: string;
  description: string;
  domain: String;
  logs: Date[]; // Array of log dates
  lastLogged: Date | null;
  logStrings: String[];
}

const weights = {
  Carrer: 30,
  Discipline: 15,
  MentalHealth: 30,
  Interests: 10,
  PhysicalHealth: 15,
};
interface ActivityContextType {
  activities: Activity[];
  weights: Object;
  incrementLog: (activityId: number) => void;
  addActivity: (activity: Activity) => void;
  currentStreak: () => number;
  longestStreak: () => number;
  totalLogs: () => number;

  mostLoggedActivity: () => Activity | null;
  leastLoggedActivity: () => Activity | null;
  getlastLogged: (activity: Activity[]) => Activity;
  getFirstLogged: (activity: Activity[]) => Activity;
}

const initialActivities: Activity[] = [
  {
    id: 1,

    name: "3 hour studying",
    description: "Studying for 3 hours",
    domain: "Carrer",
    logs: [],
    logStrings: [],
    lastLogged: null,
  },
  {
    id: 2,

    name: "Discipline",
    description: "Consuming alcohol",
    domain: "",
    logs: [],
    logStrings: [],
    lastLogged: null,
  },
  {
    id: 3,

    name: "",
    description: "Recklessly spending money on useless stuff",
    domain: "Mental Health",
    logs: [],
    logStrings: [],
    lastLogged: null,
  },
  {
    id: 4,

    name: "",
    description: "do some weitgrhss",
    domain: "Interests",
    logStrings: [],
    logs: [],
    lastLogged: null,
  },
  {
    id: 5,

    name: "Reading Books",
    description: "short booskod",
    domain: "Physical Health",
    logStrings: [],
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
          logStrings: [
            ...activity.logStrings,
            newLogDate.toISOString().slice(0, 10),
          ],
        };
      }
      return activity;
    });
    setActivities(updatedActivities);
  };

  const addActivity = (activity: Activity) => {
    setActivities([...activities, { ...activity, logs: [] }]);
  };

  interface ActivityContextType {
    activities: Activity[];
    longestStreak: () => number;
    currentStreak: () => number;
  }

  const getlastLogged = (activities: Activity[]): Activity => {
    let mostRecent: Activity = activities[0];

    activities.forEach((activity) => {
      if (activity.lastLogged! > mostRecent.lastLogged!) {
        mostRecent = activity;
      }
    });
    return mostRecent;
  };
  const getFirstLogged = (activities: Activity[]): Activity => {
    let mostRecent: Activity = activities[0];

    activities.forEach((activity) => {
      if (activity.lastLogged! < mostRecent.lastLogged!) {
        mostRecent = activity;
      }
    });
    return mostRecent;
  };

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
  const leastLoggedActivity = (): Activity | null => {
    if (activities.length === 0) return null;
    return activities.reduce((prev, current) =>
      prev.logs.length < current.logs.length ? prev : current
    );
  };

  return (
    <ActivityContext.Provider
      value={{
        activities,
        weights,
        incrementLog,
        addActivity,
        currentStreak,
        longestStreak,
        totalLogs,
        mostLoggedActivity,
        leastLoggedActivity,
        getlastLogged,
        getFirstLogged,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
