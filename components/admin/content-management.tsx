"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, Megaphone, Calendar, FileText, X, Eye, Send } from "lucide-react"

export function ContentManagement() {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Guild Election Nominations Now Open",
      content: "We are excited to announce that nominations for the 2024 Guild Council elections are now open!",
      author: "Admin",
      date: "2024-03-30",
      category: "Elections",
      priority: "high",
      status: "published",
    },
    {
      id: 2,
      title: "Library Hours Extended",
      content: "Library will be open from 6:00 AM to 11:00 PM during exam period.",
      author: "Admin",
      date: "2024-03-29",
      category: "Academic",
      priority: "medium",
      status: "published",
    },
  ])

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Guild Elections 2024",
      description: "Annual guild council elections",
      date: "2024-04-15",
      time: "9:00 AM",
      location: "Main Auditorium",
      category: "Elections",
      status: "upcoming",
    },
    {
      id: 2,
      title: "Career Fair 2024",
      description: "Meet with potential employers",
      date: "2024-04-08",
      time: "10:00 AM",
      location: "Sports Complex",
      category: "Career",
      status: "upcoming",
    },
  ])

  const [activeTab, setActiveTab] = useState("announcements")
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    category: "",
    priority: "medium",
  })

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
  })

  const categories = ["Elections", "Academic", "Sports", "Cultural", "Wellness", "Financial", "General"]
  const priorities = ["low", "medium", "high"]

  const handleCreateAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      const announcement = {
        id: Date.now(),
        ...newAnnouncement,
        author: "Admin",
        date: new Date().toISOString().split("T")[0],
        status: "published",
      }
      setAnnouncements([announcement, ...announcements])
      setNewAnnouncement({ title: "", content: "", category: "", priority: "medium" })
      setIsCreating(false)
    }
  }

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      const event = {
        id: Date.now(),
        ...newEvent,
        status: "upcoming",
      }
      setEvents([event, ...events])
      setNewEvent({ title: "", description: "", date: "", time: "", location: "", category: "" })
      setIsCreating(false)
    }
  }

  const handleDeleteAnnouncement = (id: number) => {
    if (confirm("Are you sure you want to delete this announcement?")) {
      setAnnouncements(announcements.filter((a) => a.id !== id))
    }
  }

  const handleDeleteEvent = (id: number) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((e) => e.id !== id))
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      Elections: "bg-purple-100 text-purple-800",
      Academic: "bg-blue-100 text-blue-800",
      Sports: "bg-green-100 text-green-800",
      Cultural: "bg-yellow-100 text-yellow-800",
      Wellness: "bg-pink-100 text-pink-800",
      Financial: "bg-red-100 text-red-800",
      Career: "bg-indigo-100 text-indigo-800",
      General: "bg-gray-100 text-gray-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="p-4 md:p-6">
      <div className="border-2 border-purple-300 rounded-xl p-4 md:p-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">Content Management</h1>
            <p className="text-gray-600">Create and manage announcements, events, and content</p>
          </div>
          <Button onClick={() => setIsCreating(true)} className="bg-purple-700 hover:bg-purple-800 w-full lg:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Create Content
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="announcements" className="space-y-6">
            {/* Create Announcement Form */}
            {isCreating && activeTab === "announcements" && (
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Megaphone className="w-5 h-5 mr-2 text-green-600" />
                      Create New Announcement
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => setIsCreating(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newAnnouncement.title}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                      placeholder="Enter announcement title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      rows={4}
                      value={newAnnouncement.content}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                      placeholder="Enter announcement content"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <select
                        value={newAnnouncement.category}
                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <select
                        value={newAnnouncement.priority}
                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, priority: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        {priorities.map((priority) => (
                          <option key={priority} value={priority}>
                            {priority}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2">
                    <Button onClick={handleCreateAnnouncement} className="bg-green-700 hover:bg-green-800">
                      <Send className="w-4 h-4 mr-2" />
                      Publish Announcement
                    </Button>
                    <Button variant="outline" onClick={() => setIsCreating(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Announcements List */}
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <Card key={announcement.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge className={getCategoryColor(announcement.category)}>{announcement.category}</Badge>
                          <Badge className={getPriorityColor(announcement.priority)}>
                            {announcement.priority} priority
                          </Badge>
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            {announcement.status}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{announcement.title}</h3>
                        <p className="text-gray-600 mb-2 line-clamp-2">{announcement.content}</p>
                        <p className="text-sm text-gray-500">
                          By {announcement.author} • {announcement.date}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                        <Button size="sm" variant="outline" className="flex-1 lg:flex-none">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 lg:flex-none">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteAnnouncement(announcement.id)}
                          className="text-red-600 hover:text-red-700 flex-1 lg:flex-none"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            {/* Create Event Form */}
            {isCreating && activeTab === "events" && (
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                      Create New Event
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => setIsCreating(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="eventTitle">Event Title</Label>
                    <Input
                      id="eventTitle"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      placeholder="Enter event title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="eventDescription">Description</Label>
                    <Textarea
                      id="eventDescription"
                      rows={3}
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      placeholder="Enter event description"
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="eventDate">Date</Label>
                      <Input
                        id="eventDate"
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="eventTime">Time</Label>
                      <Input
                        id="eventTime"
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="eventCategory">Category</Label>
                      <select
                        value={newEvent.category}
                        onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="eventLocation">Location</Label>
                    <Input
                      id="eventLocation"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      placeholder="Enter event location"
                    />
                  </div>
                  <div className="flex flex-col md:flex-row gap-2">
                    <Button onClick={handleCreateEvent} className="bg-blue-700 hover:bg-blue-800">
                      <Calendar className="w-4 h-4 mr-2" />
                      Create Event
                    </Button>
                    <Button variant="outline" onClick={() => setIsCreating(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Events List */}
            <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
              {events.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1 min-w-0">
                        <Badge className={getCategoryColor(event.category)} variant="secondary">
                          {event.category}
                        </Badge>
                        <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-2">{event.title}</h3>
                        <p className="text-gray-600 mb-3">{event.description}</p>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>
                            📅 {event.date} at {event.time}
                          </p>
                          <p>📍 {event.location}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteEvent(event.id)}
                        className="text-red-600 hover:text-red-700 flex-1"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <Card>
                <CardContent className="p-4 md:p-6 text-center">
                  <Megaphone className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{announcements.length}</div>
                  <div className="text-sm text-gray-600">Total Announcements</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 md:p-6 text-center">
                  <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{events.length}</div>
                  <div className="text-sm text-gray-600">Total Events</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 md:p-6 text-center">
                  <Eye className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">1,250</div>
                  <div className="text-sm text-gray-600">Total Views</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 md:p-6 text-center">
                  <FileText className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">89%</div>
                  <div className="text-sm text-gray-600">Engagement Rate</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
