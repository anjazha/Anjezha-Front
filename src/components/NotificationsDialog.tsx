import { useEffect, useState, useMemo, useCallback } from "react";
import { Bell, ArrowBigLeft } from "lucide-react";
import { axiosInstance, cookie } from "../functions/axiosInstance";
import toast from "react-hot-toast";

// Notification Interface
interface Notification {
  message: string;
  is_read: boolean;
  created_at: string;
  id: number;
  user_id: number;
}

// Custom hook to manage notifications API interactions
const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotifications = useCallback(() => {
    axiosInstance
      .get("/notifications", {
        headers: {
          Authorization: `Bearer ${cookie.get("token")}`,
        },
      })
      .then((res) => {
        setNotifications(res.data.data);
      })
      .catch(() => {
        toast.error("حدث خطأ أثناء جلب الإشعارات");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const markAsRead = useCallback((ids: number[]) => {
    axiosInstance
      .put(
        "/notifications/mark-as-read",
        { notificationIds: ids },
        {
          headers: {
            Authorization: `Bearer ${cookie.get("token")}`,
          },
        }
      )
      .then(() => {
        // Optimistically mark notifications as read locally
        setNotifications((prev) =>
          prev.map((n) =>
            ids.includes(n.id) ? { ...n, is_read: true } : n
          )
        );
        toast.success("تم تحديث الإشعارات");
      })
      .catch(() => {
        toast.error("حدث خطأ أثناء تحديث الإشعارات");
      });
  }, []);

  return { notifications, isLoading, fetchNotifications, markAsRead };
};

function NotificationsDialog() {
  const [open, setOpen] = useState(false);
  const { notifications, isLoading, fetchNotifications, markAsRead } =
    useNotifications();

  const unreadNotifications = useMemo(
    () => notifications.filter((n) => !n.is_read),
    [notifications]
  );

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleMarkAsRead = () => {
    const unreadIds = unreadNotifications.map((n) => n.id);
    markAsRead(unreadIds);
  };

  return (
    <div className="relative">
      {unreadNotifications.length > 0 && (
        <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
      )}
      <div className="cursor-pointer" onClick={() => setOpen(!open)}>
        <Bell size={24} />
      </div>

      {open && (
        <div className="absolute top-[100%] mt-2 left-0 w-52 h-auto max-h-64 p-1 border bg-inputColor dark:bg-inputDark z-10 rounded-md shadow-lg overflow-auto">
          {isLoading ? (
            <div>جاري التحميل...</div>
          ) : (
            <>
              {notifications.length === 0 ? (
                <div className="p-1">لا يوجد إشعارات جديدة</div>
              ) : (
                <>
                  {unreadNotifications.length > 0 && (
                    <button
                      className="w-full text-center text-sm font-bold flex justify-center gap-1 bg-bodyColor dark:bg-bodyDark py-1 rounded-t-md"
                      onClick={handleMarkAsRead}
                    >
                      <span>تحديث الإشعارات</span> <ArrowBigLeft />
                    </button>
                  )}

                  {notifications.map((notification: Notification) => (
                    <div
                      key={notification.id}
                      className={`p-1 border-b-2 ${
                        !notification.is_read && "bg-slate-200"
                      } border-gray-300 dark:border-gray-700 dark:bg-[#65676b]`}
                    >
                      <div className="text-sm">{notification.message}</div>
                      <div className="text-[9px]">
                        {notification.created_at}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationsDialog;
