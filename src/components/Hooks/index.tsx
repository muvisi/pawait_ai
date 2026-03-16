interface Notification {
  id: any;
  body: string;
  conversation_id: string;
  is_read: boolean;
  message_id: string;
  timestamp?: number;
  created_at?: any;
  title: string;
}

interface NotificationGroups {
  Today: Notification[];
  Yesterday: Notification[];
  Earlier: Notification[];
}

/**
 * Returns the timestamp for a notification, using created_at or timestamp.
 */
const getNotificationDate = (n: Notification) => {
  return new Date(n.created_at || n.timestamp || '');
};

/**
 * Groups notifications by Today, Yesterday, and Earlier.
 * Automatically sorts each group newest → oldest.
 */
export const groupNotificationsByDate = (
  notifications: Notification[]
): NotificationGroups => {
  const groups: NotificationGroups = {
    Today: [],
    Yesterday: [],
    Earlier: [],
  };

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const startOfYesterday = new Date(
    yesterday.getFullYear(),
    yesterday.getMonth(),
    yesterday.getDate()
  );

  // Sort notifications newest first
  const sortedNotifications = [...notifications].sort(
    (a, b) =>
      getNotificationDate(b).getTime() - getNotificationDate(a).getTime()
  );

  sortedNotifications.forEach((n) => {
    const date = getNotificationDate(n);

    if (date >= startOfToday) {
      groups.Today.push(n);
    } else if (date >= startOfYesterday) {
      groups.Yesterday.push(n);
    } else {
      groups.Earlier.push(n);
    }
  });

  return groups;
};

/**
 * Efficiently inserts a single new notification into an existing grouped state.
 */
export const insertNotificationIntoGroups = (
  groups: NotificationGroups,
  notification: Notification
): NotificationGroups => {
  const date = getNotificationDate(notification);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const startOfYesterday = new Date(
    yesterday.getFullYear(),
    yesterday.getMonth(),
    yesterday.getDate()
  );

  // Clone the groups to avoid mutating state directly
  const newGroups: NotificationGroups = {
    Today: [...groups.Today],
    Yesterday: [...groups.Yesterday],
    Earlier: [...groups.Earlier],
  };

  if (date >= startOfToday) {
    newGroups.Today.unshift(notification); // insert at top
  } else if (date >= startOfYesterday) {
    newGroups.Yesterday.unshift(notification);
  } else {
    newGroups.Earlier.unshift(notification);
  }

  return newGroups;
};
