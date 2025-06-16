"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  Users,
  Eye,
  Save,
  X,
  Search,
  Filter,
  Download,
  Upload,
  Copy,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { eventStore, type Event } from "@/lib/event-store"
import { ImageUpload } from "@/components/ui/image-upload"

export function EventsManagement() {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [activeTab, setActiveTab] = useState("all-events")
  const [isCreating, setIsCreating] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [previewEvent, setPreviewEvent] = useState<Event | null>(null)
  const [selectedEvents, setSelectedEvents] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("")
  const [filterStatus, setFilterStatus] = useState("")

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    attendees: 0,
    status: "upcoming",
    image: "/placeholder.svg?height=200&width=300",
  })

  const categories = ["Elections", "Academic", "Sports", "Cultural", "Wellness", "Financial", "General", "Career"]
  const statuses = ["upcoming", "ongoing", "completed", "cancelled"]

  // Load events from store
  useEffect(() => {
    const loadedEvents = eventStore.getEvents()
    setEvents(loadedEvents)
    setFilteredEvents(loadedEvents)
  }, [])

  // Filter events based on search and filters
  useEffect(() => {
    let filtered = events

    if (searchQuery) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (filterCategory) {
      filtered = filtered.filter((event) => event.category === filterCategory)
    }

    if (filterStatus) {
      filtered = filtered.filter((event) => event.status === filterStatus)
    }

    setFilteredEvents(filtered)
  }, [events, searchQuery, filterCategory, filterStatus])

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      const eventData = {
        ...newEvent,
        attendees: newEvent.attendees || 0,
      }
      eventStore.addEvent(eventData)
      setEvents(eventStore.getEvents())
      setNewEvent({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        category: "",
        attendees: 0,
        status: "upcoming",
        image: "/placeholder.svg?height=200&width=300",
      })
      setIsCreating(false)
    }
  }

  const handleEditEvent = (event: Event) => {
    setEditingEvent({ ...event })
    setShowEditModal(true)
  }

  const handleUpdateEvent = () => {
    if (editingEvent && editingEvent.title && editingEvent.date && editingEvent.time) {
      eventStore.updateEvent(editingEvent.id, editingEvent)
      setEvents(eventStore.getEvents())
      setEditingEvent(null)
      setShowEditModal(false)
    }
  }

  const handleDeleteEvent = (id: number) => {
    if (confirm("Are you sure you want to delete this event?")) {
      eventStore.deleteEvent(id)
      setEvents(eventStore.getEvents())
    }
  }

  const handleBulkDelete = () => {
    if (selectedEvents.length === 0) return
    if (confirm(`Are you sure you want to delete ${selectedEvents.length} selected events?`)) {
      selectedEvents.forEach((id) => eventStore.deleteEvent(id))
      setEvents(eventStore.getEvents())
      setSelectedEvents([])
    }
  }

  const handleDuplicateEvent = (event: Event) => {
    const duplicatedEvent = {
      ...event,
      title: `${event.title} (Copy)`,
      id: undefined, // Let the store generate a new ID
    }
    eventStore.addEvent(duplicatedEvent)
    setEvents(eventStore.getEvents())
  }

  const handlePreviewEvent = (event: Event) => {
    setPreviewEvent(event)
    setShowPreviewModal(true)
  }

  const toggleEventSelection = (eventId: number) => {
    setSelectedEvents((prev) => (prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]))
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "ongoing":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "completed":
        return <CheckCircle className="w-4 h-4 text-gray-600" />
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "ongoing":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const eventStats = {
    total: events.length,
    upcoming: events.filter((e) => e.status === "upcoming").length,
    ongoing: events.filter((e) => e.status === "ongoing").length,
    completed: events.filter((e) => e.status === "completed").length,
    cancelled: events.filter((e) => e.status === "cancelled").length,
  }

  return (
    <div className="p-4 md:p-6">
      <div className="border-2 border-purple-300 rounded-xl p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">Events Management</h1>
            <p className="text-gray-600">Create, edit, and manage all student events</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
            <Button onClick={() => setIsCreating(true)} className="bg-purple-700 hover:bg-purple-800">
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{eventStats.total}</div>
              <div className="text-sm text-gray-600">Total Events</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{eventStats.upcoming}</div>
              <div className="text-sm text-gray-600">Upcoming</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{eventStats.ongoing}</div>
              <div className="text-sm text-gray-600">Ongoing</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{eventStats.completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{eventStats.cancelled}</div>
              <div className="text-sm text-gray-600">Cancelled</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all-events">All Events</TabsTrigger>
            <TabsTrigger value="templates">Event Templates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="all-events" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search events by title, description, or location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">All Categories</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">All Status</option>
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      More Filters
                    </Button>
                  </div>
                </div>

                {/* Bulk Actions */}
                {selectedEvents.length > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <span className="text-sm text-blue-800">
                        {selectedEvents.length} event{selectedEvents.length > 1 ? "s" : ""} selected
                      </span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={handleBulkDelete}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Selected
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setSelectedEvents([])}>
                          Clear Selection
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Create Event Form */}
            {isCreating && (
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-green-600" />
                      Create New Event
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => setIsCreating(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="eventTitle">Event Title *</Label>
                        <Input
                          id="eventTitle"
                          value={newEvent.title}
                          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                          placeholder="Enter event title"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="eventDescription">Description *</Label>
                        <Textarea
                          id="eventDescription"
                          rows={4}
                          value={newEvent.description}
                          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                          placeholder="Enter detailed event description"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="eventLocation">Location *</Label>
                        <Input
                          id="eventLocation"
                          value={newEvent.location}
                          onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                          placeholder="Enter event location"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="eventDate">Date *</Label>
                          <Input
                            id="eventDate"
                            type="date"
                            value={newEvent.date}
                            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="eventTime">Time *</Label>
                          <Input
                            id="eventTime"
                            value={newEvent.time}
                            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                            placeholder="e.g., 9:00 AM - 5:00 PM"
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="eventCategory">Category *</Label>
                        <select
                          value={newEvent.category}
                          onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                        <Label htmlFor="eventAttendees">Expected Attendees</Label>
                        <Input
                          id="eventAttendees"
                          type="number"
                          value={newEvent.attendees}
                          onChange={(e) =>
                            setNewEvent({ ...newEvent, attendees: Number.parseInt(e.target.value) || 0 })
                          }
                          placeholder="Expected number of attendees"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="eventStatus">Event Status</Label>
                        <select
                          value={newEvent.status}
                          onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <ImageUpload
                      currentImage={newEvent.image}
                      onImageChange={(imageUrl) => setNewEvent({ ...newEvent, image: imageUrl })}
                      label="Event Image"
                      aspectRatio="landscape"
                      className="mt-4"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                    <Button onClick={handleCreateEvent} className="bg-green-700 hover:bg-green-800">
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
            <div className="space-y-4">
              {filteredEvents.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {events.length === 0 ? "No Events Created" : "No Events Found"}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {events.length === 0
                        ? "Create your first event to get started!"
                        : "Try adjusting your search or filters."}
                    </p>
                    {events.length === 0 && (
                      <Button onClick={() => setIsCreating(true)} className="bg-purple-700 hover:bg-purple-800">
                        <Plus className="w-4 h-4 mr-2" />
                        Create First Event
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                filteredEvents.map((event) => (
                  <Card key={event.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex items-start gap-4">
                        <input
                          type="checkbox"
                          checked={selectedEvents.includes(event.id)}
                          onChange={() => toggleEventSelection(event.id)}
                          className="mt-1 rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <Badge className={getCategoryColor(event.category)}>{event.category}</Badge>
                            <Badge className={getStatusColor(event.status)} variant="secondary">
                              <span className="flex items-center gap-1">
                                {getStatusIcon(event.status)}
                                {event.status}
                              </span>
                            </Badge>
                            <Badge variant="outline" className="bg-purple-50 text-purple-700">
                              Live for Students
                            </Badge>
                          </div>

                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                          <p className="text-gray-600 mb-3 text-sm line-clamp-2">{event.description}</p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                              <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2 text-green-500" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2 text-red-500" />
                              <span className="truncate">{event.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-2 text-purple-500" />
                              <span>{event.attendees} expected</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditEvent(event)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handlePreviewEvent(event)}>
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDuplicateEvent(event)}>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteEvent(event.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Templates</CardTitle>
                <p className="text-gray-600">Create reusable templates for common event types</p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <Card key={category} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <Calendar className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{category} Template</h3>
                        <p className="text-sm text-gray-600 mb-3">Quick template for {category.toLowerCase()} events</p>
                        <Button size="sm" variant="outline" className="w-full">
                          Use Template
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Eye className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">2,450</div>
                  <div className="text-sm text-gray-600">Total Event Views</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">890</div>
                  <div className="text-sm text-gray-600">Total Registrations</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">4.8</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">95%</div>
                  <div className="text-sm text-gray-600">Attendance Rate</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Event Modal */}
      {editingEvent && (
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">Edit Event</DialogTitle>
              <p className="text-gray-600">Make changes to the event that students will see</p>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="editEventTitle">Event Title *</Label>
                    <Input
                      id="editEventTitle"
                      value={editingEvent.title}
                      onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                      placeholder="Enter event title"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="editEventDescription">Description *</Label>
                    <Textarea
                      id="editEventDescription"
                      rows={4}
                      value={editingEvent.description}
                      onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                      placeholder="Enter detailed event description"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="editEventLocation">Location *</Label>
                    <Input
                      id="editEventLocation"
                      value={editingEvent.location}
                      onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                      placeholder="Enter event location"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="editEventDate">Date *</Label>
                      <Input
                        id="editEventDate"
                        type="date"
                        value={editingEvent.date}
                        onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="editEventTime">Time *</Label>
                      <Input
                        id="editEventTime"
                        value={editingEvent.time}
                        onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                        placeholder="e.g., 9:00 AM - 5:00 PM"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="editEventCategory">Category *</Label>
                    <select
                      value={editingEvent.category}
                      onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <Label htmlFor="editEventAttendees">Expected Attendees</Label>
                    <Input
                      id="editEventAttendees"
                      type="number"
                      value={editingEvent.attendees}
                      onChange={(e) =>
                        setEditingEvent({ ...editingEvent, attendees: Number.parseInt(e.target.value) || 0 })
                      }
                      placeholder="Expected number of attendees"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="editEventStatus">Event Status</Label>
                    <select
                      value={editingEvent.status}
                      onChange={(e) => setEditingEvent({ ...editingEvent, status: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <ImageUpload
                  currentImage={editingEvent.image}
                  onImageChange={(imageUrl) => setEditingEvent({ ...editingEvent, image: imageUrl })}
                  label="Event Image"
                  aspectRatio="landscape"
                  className="mt-4"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Student Visibility Settings</h4>
                <div className="space-y-3">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-blue-800">Allow student registration</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-blue-800">Send notifications to students</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-blue-800">Show in student calendar</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <Button onClick={handleUpdateEvent} className="bg-blue-700 hover:bg-blue-800">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleDeleteEvent(editingEvent.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Event
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Preview Event Modal */}
      {previewEvent && (
        <Dialog open={showPreviewModal} onOpenChange={setShowPreviewModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Student View Preview</DialogTitle>
              <p className="text-gray-600">This is how students will see this event</p>
            </DialogHeader>
            <div className="space-y-4">
              <img
                src={previewEvent.image || "/placeholder.svg?height=200&width=400"}
                alt={previewEvent.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="flex flex-wrap gap-2">
                <Badge className={getCategoryColor(previewEvent.category)}>{previewEvent.category}</Badge>
                <Badge className={getStatusColor(previewEvent.status)}>{previewEvent.status}</Badge>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{previewEvent.title}</h2>
              <p className="text-gray-600">{previewEvent.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                  <span>{new Date(previewEvent.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-green-500" />
                  <span>{previewEvent.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-red-500" />
                  <span>{previewEvent.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-purple-500" />
                  <span>{previewEvent.attendees} expected</span>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button className="bg-purple-700 hover:bg-purple-800">Register Now</Button>
                <Button variant="outline">Add to Calendar</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
