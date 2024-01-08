const pendingNotificationsCache = new Map();

export const getPendingNotifications = (email) => {
  return pendingNotificationsCache.get(email) || [];
};

export const storePendingNotification = (email, notification) => {
  const notifications = pendingNotificationsCache.get(email) || [];
  notifications.push(notification);
  pendingNotificationsCache.set(email, notifications);
};

export const clearPendingNotifications = (email) => {
  pendingNotificationsCache.delete(email);
};
