import React, { useState, useEffect } from "react";
import className from "classnames";
import Entry from "./Entry";
import LiveStreamRoom from "./LiveStreamRoom";
import { showNotification } from '../services/showNotification';
import { Button } from "react-bootstrap";
import Apis, { endpoints } from "../configs/Apis";
import { toastError } from "./Toast/Notification";

const Bell = ({ updateNotifications }) => {
  
  const [isVisible, setIsVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const [livestreams, setLiveStreams] = useState([]);
  const loadLiveStreams = async () => {
    try {
      let res = await Apis.get(endpoints['livestreams']);
      const formattedLive= res.data.map(live => ({
        ...live,
        date: new Date(live.date).toLocaleString(),
        
      }));
      setLiveStreams(formattedLive);
      console.log(formattedLive);
    } catch (ex) {
      console.error(ex);
      toastError("Lỗi khi tải danh sách");
    }
  };

  useEffect(() =>{
    loadLiveStreams()

  },[])

  useEffect(() => {
    // establish WS connection
    // fake it till ya make it
    // Tạo mảng notifications từ danh sách livestreams
    const newNotifications = livestreams.map(live => ({
      id: live.id,
      title: live.title,
      startedAt: live.date,
      thumbnail: live.thumbnail
    }));
  
    // Cập nhật state notifications
    setNotifications(newNotifications);
  }, [livestreams]); // Sử dụng livestreams làm dependency

  const NotificationCount = () => {
    // TODO: Use time-based logic to show `new` notifications bug
    if (notifications && notifications.length) {
      return `Bạn có ${notifications.length} thông báo`;
    }
    return "Chưa có thông báo nào";
  };
  return (
    <>
      <span className="bell" onClick={() => setIsVisible((prev) => !prev)}>
        <span
          role="img"
          aria-label="notifications"
          className={className({ "has-notifications": notifications.length })}
        >
          <svg
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="35"
            color="inherit"
            title="Notifications"
            class="sc-AxjAm kITaNo"
          >
            <path
              d="M9.03657 1.06667C9.03657 1.10232 9.03487 1.13756 9.03155 1.17231C11.3998 1.66446 13.1829 3.81795 13.1829 6.4V8.53333L15.3507 12.2512C15.7652 12.9622 15.2675 13.8667 14.4618 13.8667H8H1.53818C0.732452 13.8667 0.234778 12.9622 0.649321 12.2512L2.81711 8.53333L2.81711 6.4C2.81711 3.81795 4.60022 1.66446 6.96844 1.17231C6.96512 1.13756 6.96342 1.10232 6.96342 1.06667C6.96342 0.477563 7.42751 0 8 0C8.57248 0 9.03657 0.477563 9.03657 1.06667ZM8.00001 16C7.23265 16 6.56267 15.571 6.20421 14.9333H9.79581C9.43735 15.571 8.76737 16 8.00001 16Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </span>
        {isVisible && (
          <div class="notification-hub">
            <header>
              <a href="/view-all">Xem tất cả</a>
              <NotificationCount />
            </header>
            <ul>
              {notifications &&
                notifications.map((notif) => (
                  <Entry
                    key={notif.ObjectId}
                    title={notif.title}
                    startedAt={notif.startedAt}
                    thumbnail={notif.thumbnail}
                  />
                ))}
            </ul>
          </div>
        )}
      </span>
    </>
  );
};

export default Bell;
