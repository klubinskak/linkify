"use client";
import { NotificationContext } from "@/app/context/notificationsContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { INotification } from "@/models/notification";
import { Mails } from "lucide-react";
import React, { useContext } from "react";

const Notification = () => {
  const { notifications } = useContext(NotificationContext);

  return (
    <>
      {notifications.map((notification: INotification, index: number) => (
        <div key={index} className="alert fixed z-10 top-0 right-0 m-2">
          <Alert>
            <Mails />
            <AlertTitle className="font-bold ml-3">{notification.title}</AlertTitle>
            <AlertDescription className="ml-3 text-sm">
              {notification.message}
            </AlertDescription>
          </Alert>
        </div>
      ))}
    </>
  );
};

export default Notification;
