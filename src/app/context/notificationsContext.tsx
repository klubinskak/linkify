"use client";

import { INotification } from '@/models/notification';
import { createContext, useState } from 'react';

interface NotificationContextType {
  notifications: INotification[];
  addNotification: (notification: INotification) => void;
}

export const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  addNotification: () => {},
});

import { ReactNode } from 'react';

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const addNotification = (notification: INotification) => {
    setNotifications((prev) => [...prev, notification]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n !== notification));
    }, 5000); // Remove notification after 5 seconds
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};