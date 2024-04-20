interface Activity {
    name: string;
    description: string;
    color: string;
    logs: string[];
    lastLogged: Date | null;
  }
  
  interface ActivityContextType {
    activity: Activity;
    setActivity: (activity: Activity) => void;
    addLog: (log: string) => void;
  }

  import React, { createContext, useState, useContext, ReactNode } from 'react';

const initialActivity: Activity = {
  name: "",
  description: "",
  color: "",
  logs: [],
  lastLogged: null
};

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (context === undefined) {
    throw new Error('useActivity must be used within an ActivityProvider');
  }
  return context;
};

interface ActivityProviderProps {
    children: ReactNode;
  }
  
  export const ActivityProvider: React.FC<ActivityProviderProps> = ({ children }) => {
    const [activity, setActivity] = useState<Activity>(initialActivity);
  
    const addLog = (log: string) => {
      const newLogs = [...activity.logs, log];
      setActivity({ ...activity, logs: newLogs, lastLogged: new Date() });
    };
  
    return (
      <ActivityContext.Provider value={{ activity, setActivity, addLog }}>
        {children}
      </ActivityContext.Provider>
    );
  };
  