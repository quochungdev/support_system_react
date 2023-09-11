// NotificationService.js
export const showNotification = (message, notifications, setNotifications) => {
    // Hiển thị thông báo
    // Thêm thông báo mới vào danh sách
    const newNotification = {
      ObjectId: notifications.length + 1, // Đảm bảo ObjectId là duy nhất
      title: message,
      startedAt: new Date().toLocaleString(),
      percentage: "0", // Thêm thông tin khác nếu cần
    };
  
    setNotifications([...notifications, newNotification]);
  };
  