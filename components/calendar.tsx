"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Plus, CalendarIcon, Clock, MapPin } from "lucide-react"

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [view, setView] = useState<"month" | "week" | "day">("month")

  const events = [
    {
      id: 1,
      title: "Guild Elections 2024",
      date: "2024-04-15",
      time: "9:00 AM",
      duration: "8 hours",
      location: "Main Auditorium",
      type: "election",
      description: "Annual guild council elections",
    },
    {
      id: 2,
      title: "Career Fair 2024",
      date: "2024-04-08",
      time: "10:00 AM",
      duration: "6 hours",
      location: "Sports Complex",
      type: "career",
      description: "Meet with potential employers",
    },
    {
      id: 3,
      title: "Guild Council Meeting",
      date: "2024-04-02",
      time: "2:00 PM",
      duration: "2 hours",
      location: "Guild Office",
      type: "meeting",
      description: "Weekly council meeting",
    },
    {
      id: 4,
      title: "Cultural Night",
      date: "2024-04-20",
      time: "6:00 PM",
      duration: "5 hours",
      location: "University Grounds",
      type: "cultural",
      description: "Celebrate diversity",
    },
    {
      id: 5,
      title: "Academic Excellence Awards",
      date: "2024-04-25",
      time: "2:00 PM",
      duration: "3 hours",
      location: "Conference Hall",
      type: "academic",
      description: "Recognition ceremony",
    },
  ]

  const getEventTypeColor = (type: string) => {
    const colors = {
      election: "bg-purple-100 text-purple-800 border-purple-200",
      career: "bg-blue-100 text-blue-800 border-blue-200",
      meeting: "bg-green-100 text-green-800 border-green-200",
      cultural: "bg-yellow-100 text-yellow-800 border-yellow-200",
      academic: "bg-red-100 text-red-800 border-red-200",
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getEventsForDate = (date: string) => {
    return events.filter((event) => event.date === date)
  }

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      const dayEvents = getEventsForDate(dateString)
      const isToday = new Date().toDateString() === new Date(dateString).toDateString()

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 p-1 cursor-pointer hover:bg-gray-50 ${
            isToday ? "bg-purple-50 border-purple-300" : ""
          }`}
          onClick={() => setSelectedDate(new Date(dateString))}
        >
          <div className={`text-sm font-medium ${isToday ? "text-purple-700" : "text-gray-900"}`}>{day}</div>
          <div className="space-y-1 mt-1">
            {dayEvents.slice(0, 2).map((event) => (
              <div key={event.id} className={`text-xs p-1 rounded truncate ${getEventTypeColor(event.type)}`}>
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>}
          </div>
        </div>,
      )
    }

    return days
  }

  return (
    <div className="p-6">
      <div className="border-2 border-purple-300 rounded-xl p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Calendar</h1>
            <p className="text-gray-600">View and manage events and important dates</p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <div className="flex border border-gray-300 rounded-lg">
              <Button
                variant={view === "month" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("month")}
                className={view === "month" ? "bg-purple-700 hover:bg-purple-800" : ""}
              >
                Month
              </Button>
              <Button
                variant={view === "week" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("week")}
                className={view === "week" ? "bg-purple-700 hover:bg-purple-800" : ""}
              >
                Week
              </Button>
              <Button
                variant={view === "day" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("day")}
                className={view === "day" ? "bg-purple-700 hover:bg-purple-800" : ""}
              >
                Day
              </Button>
            </div>
            <Button className="bg-purple-700 hover:bg-purple-800">
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                      Today
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Calendar Header */}
                <div className="grid grid-cols-7 gap-0 mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-gray-600">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-0 border border-gray-200">{renderCalendarGrid()}</div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {events.slice(0, 5).map((event) => (
                    <div key={event.id} className="p-3 border border-gray-200 rounded-lg">
                      <h4 className="font-medium text-gray-900 text-sm">{event.title}</h4>
                      <div className="mt-1 space-y-1">
                        <div className="flex items-center space-x-1 text-xs text-gray-600">
                          <CalendarIcon className="w-3 h-3" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-gray-600">
                          <Clock className="w-3 h-3" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-gray-600">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <Badge className={`mt-2 ${getEventTypeColor(event.type)}`} variant="secondary">
                        {event.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Event Types Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Event Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-200 rounded"></div>
                    <span className="text-sm">Elections</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-200 rounded"></div>
                    <span className="text-sm">Career</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-200 rounded"></div>
                    <span className="text-sm">Meetings</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-200 rounded"></div>
                    <span className="text-sm">Cultural</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-200 rounded"></div>
                    <span className="text-sm">Academic</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Selected Date Details */}
        {selectedDate && (
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  Events for{" "}
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const dateString = selectedDate.toISOString().split("T")[0]
                  const dayEvents = getEventsForDate(dateString)

                  if (dayEvents.length === 0) {
                    return <p className="text-gray-600">No events scheduled for this date.</p>
                  }

                  return (
                    <div className="space-y-4">
                      {dayEvents.map((event) => (
                        <div key={event.id} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-900">{event.title}</h4>
                              <p className="text-gray-600 mt-1">{event.description}</p>
                              <div className="mt-2 space-y-1 text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                  <Clock className="w-4 h-4" />
                                  <span>
                                    {event.time} ({event.duration})
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <MapPin className="w-4 h-4" />
                                  <span>{event.location}</span>
                                </div>
                              </div>
                            </div>
                            <Badge className={getEventTypeColor(event.type)} variant="secondary">
                              {event.type}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                })()}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
