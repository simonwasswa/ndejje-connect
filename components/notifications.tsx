"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Check, X, Settings, Filter } from "lucide-react"

interface NotificationsProps {
  notifications: any[]
  setNotifications: (notifications: any[]) => void
}

export function Notifications({ notifications, setNotifications }: NotificationsProps) {
  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="p-6">
      <div className="border-2 border-purple-300 rounded-xl p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Notifications</h1>
            <p className="text-gray-600">Stay updated with the latest announcements and activities</p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Badge variant="outline" className="flex items-center space-x-1">
              <Bell className="w-4 h-4" />
              <span>{unreadCount} Unread</span>
            </Badge>
            <Button variant="outline" onClick={markAllAsRead}>
              <Check className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Notification Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            All
          </Button>
          <Button variant="outline" size="sm">
            Unread
          </Button>
          <Button variant="outline" size="sm">
            Announcements
          </Button>
          <Button variant="outline" size="sm">
            Events
          </Button>
          <Button variant="outline" size="sm">
            Messages
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className={`${!notification.read ? "border-purple-300 bg-purple-50" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${!notification.read ? "bg-purple-600" : "bg-gray-300"}`}
                    ></div>
                    <div className="flex-1">
                      <h3 className={`font-medium ${!notification.read ? "text-gray-900" : "text-gray-600"}`}>
                        {notification.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{notification.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!notification.read && (
                      <Button size="sm" variant="ghost" onClick={() => markAsRead(notification.id)}>
                        <Check className="w-4 h-4" />
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" onClick={() => deleteNotification(notification.id)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">You're all caught up!</p>
          </div>
        )}

        {/* Notification Settings */}
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Notification Preferences</h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-blue-800">Email notifications</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-blue-800">Push notifications</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-blue-800">Event reminders</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-blue-800">Announcement alerts</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
