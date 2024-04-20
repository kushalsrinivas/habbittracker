interface Activity {
  id: number;
  name: string;
  description: string;
  color: string;
  logs: number; // Now counting logs as an integer.
  lastLogged: Date | null;
}

interface ActivityContextType {
  activities: Activity[];
  setActivities: (activities: Activity[]) => void;
  incrementLog: (activityId: number) => void;
}

import React, { createContext, useContext, useState, ReactNode } from "react";

const initialActivities: Activity[] = [
  {
    id: 1,
    name: "Hiking",
    description: "Exploring local trails.",
    color: "#FF6347",
    logs: 0,
    lastLogged: null,
  },
  {
    id: 2,
    name: "Reading",
    description: "Reading fiction and non-fiction books.",
    color: "#4682B4",
    logs: 0,
    lastLogged: null,
  },
  {
    id: 3,
    name: "Cooking",
    description: "Trying out new vegetarian recipes.",
    color: "#FFD700",
    logs: 0,
    lastLogged: null,
  },
  {
    id: 4,
    name: "Gardening",
    description: "Maintaining a small kitchen garden.",
    color: "#32CD32",
    logs: 0,
    lastLogged: null,
  },
  {
    id: 5,
    name: "Programming",
    description: "Working on personal coding projects.",
    color: "#8A2BE2",
    logs: 0,
    lastLogged: null,
  },
];
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
        return { ...activity, logs: activity.logs + 1, lastLogged: new Date() };
      }
      return activity;
    });
    setActivities(updatedActivities);
  };

  const addActivity = (activity: Activity) => {
    setActivities([
      ...activities,
      { ...activity, id: Math.max(...activities.map((a) => a.id)) + 1 },
    ]);
  };

  return (
    <ActivityContext.Provider
      value={{ activities, setActivities, incrementLog }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
