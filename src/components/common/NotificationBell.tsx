import { useNotificationStore } from "@/store/useNotificationStore";
import { Bell } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";

const NotificationBell = () => {
    const { notifications, unreadCount, markAllAsRead } =
        useNotificationStore();

    const handleOpenChange = (open: boolean) => {
        if (open && unreadCount > 0) {
            markAllAsRead();
        }
    };

    return (
        <Popover onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                <button className="relative p-2">
                    <Bell />
                    {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                            {unreadCount}
                        </span>
                    )}
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0">
                <div className="p-3 border-b dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                        Notifications
                    </h3>
                </div>
                <ScrollArea className="h-80">
                    <ul className="max-h-80 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <li
                                    key={notification.id}
                                    className={`p-3 text-sm border-b border-gray-200 dark:border-gray-700`}
                                >
                                    {notification.message}
                                </li>
                            ))
                        ) : (
                            <li className="p-4 text-center text-gray-500">
                                No new notifications
                            </li>
                        )}
                    </ul>
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
};

export default NotificationBell;