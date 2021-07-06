import {notification} from "antd";

import "./notification.scss";

type NotificationProps = {
  notifiType: "success" | "info" | "warning" | "error";
  message: string;
  description: string;
};

export const openNotificationWithIcon = ({
  notifiType,
  message,
  description,
}: NotificationProps) => {
  notification[notifiType]({
    placement: "topRight",
    message,
    description,
    className: `vh-notification vh-notification__${notifiType}`,
  });
};
