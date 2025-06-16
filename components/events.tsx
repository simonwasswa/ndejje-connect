"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Calendar, Clock, MapPin, Users, ExternalLink } from "lucide-react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { eventStore, type Event } from "@/lib/event-store"

export function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([])
  const [isRegistering, setIsRegistering] = useState<number | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  // Load events and subscribe to real-time changes
  useEffect(() => {
    // Initial load
    setEvents(eventStore.getEvents())

    // Subscribe to real-time updates from admin
    const unsubscribe = eventStore.subscribe(() => {
      setEvents(eventStore.getEvents())
    })

    // Cleanup subscription on unmount
    return unsubscribe
  }, [])

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "elections":
        return "bg-purple-100 text-purple-800"
      case "career":
        return "bg-blue-100 text-blue-800"
      case "cultural":
        return "bg-green-100 text-green-800"
      case "academic":
        return "bg-yellow-100 text-yellow-800"
      case "sports":
        return "bg-red-100 text-red-800"
      case "wellness":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleRegister = async (eventId: number) => {
    setIsRegistering(eventId)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (registeredEvents.includes(eventId)) {
        // Unregister
        setRegisteredEvents((prev) => prev.filter((id) => id !== eventId))
      } else {
        // Register
        setRegisteredEvents((prev) => [...prev, eventId])
      }
    } catch (error) {
      console.error("Registration failed:", error)
    } finally {
      setIsRegistering(null)
    }
  }

  return (
    <div className="p-6">
      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" className="flex items-center space-x-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>
        <Button className="bg-purple-700 hover:bg-purple-800 flex items-center space-x-2">
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="border-2 border-purple-300 rounded-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h1>
            <p className="text-gray-600 mb-8 max-w-3xl">
              Stay updated with all the exciting events happening at Ndejje University. From academic conferences to
              cultural celebrations, sports tournaments to career fairs - there's always something happening on campus!
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-700 font-medium">Live Updates</span>
            </div>
            <p className="text-xs text-green-600 mt-1">Real-time events from admin</p>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {events.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Events Available</h3>
              <p className="text-gray-600">Check back later for upcoming events!</p>
            </div>
          ) : (
            events.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-all duration-300 animate-fadeIn">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getCategoryColor(event.category)}>{event.category}</Badge>
                        <Badge variant="outline" className="text-green-700 border-green-300">
                          {event.status}
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-800">
                          <div className="flex items-center space-x-1">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                            <span>Live</span>
                          </div>
                        </Badge>
                      </div>
                      <CardTitle className="text-xl text-gray-900 mb-2">{event.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Event Image */}
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />

                  {/* Event Details */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees} expected attendees</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm">{event.description}</p>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <Button
                      size="sm"
                      className={
                        registeredEvents.includes(event.id)
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-purple-700 hover:bg-purple-800"
                      }
                      onClick={() => handleRegister(event.id)}
                      disabled={isRegistering === event.id}
                    >
                      {isRegistering === event.id
                        ? "Processing..."
                        : registeredEvents.includes(event.id)
                          ? "Registered ✓"
                          : "Register Now"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedEvent(event)
                        setShowDetailsModal(true)
                      }}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      More Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Event Calendar Integration */}
        <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-900 mb-2">📅 Add to Your Calendar</h3>
          <p className="text-yellow-800 text-sm mb-4">
            Never miss an event! You can add any of these events to your personal calendar or subscribe to our events
            calendar.
          </p>
          <div className="flex space-x-3">
            <Button size="sm" variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-100">
              Subscribe to Calendar
            </Button>
            <Button size="sm" variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-100">
              Download iCal
            </Button>
          </div>
        </div>

        {/* Event Submission */}
        <div className="mt-6 p-6 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-900 mb-2">🎉 Have an Event to Share?</h3>
          <p className="text-purple-800 text-sm mb-4">
            Planning an event for the student community? Submit your event details and we'll help promote it!
          </p>
          <Button size="sm" className="bg-purple-700 hover:bg-purple-800">
            Submit Event
          </Button>
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedEvent.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <img
                src={selectedEvent.image || "/placeholder.svg"}
                alt={selectedEvent.title}
                className="w-full h-48 object-cover rounded-lg"
              />

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-semibold">Date & Time</p>
                      <p className="text-sm text-gray-600">
                        {new Date(selectedEvent.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-sm text-gray-600">{selectedEvent.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-sm text-gray-600">{selectedEvent.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-semibold">Expected Attendees</p>
                      <p className="text-sm text-gray-600">{selectedEvent.attendees} people</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="font-semibold mb-2">Category</p>
                    <Badge className={getCategoryColor(selectedEvent.category)}>{selectedEvent.category}</Badge>
                  </div>

                  <div>
                    <p className="font-semibold mb-2">Status</p>
                    <Badge variant="outline" className="text-green-700 border-green-300">
                      {selectedEvent.status}
                    </Badge>
                  </div>

                  <div>
                    <p className="font-semibold mb-2">Registration Status</p>
                    <Badge
                      className={
                        registeredEvents.includes(selectedEvent.id)
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {registeredEvents.includes(selectedEvent.id) ? "Registered" : "Not Registered"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-2">Event Description</p>
                <p className="text-gray-600 leading-relaxed">{selectedEvent.description}</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Event Highlights</h4>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Professional networking opportunities</li>
                  <li>• Refreshments will be provided</li>
                  <li>• Certificate of participation</li>
                  <li>• Interactive sessions and Q&A</li>
                </ul>
              </div>

              <div className="flex space-x-3">
                <Button
                  className={
                    registeredEvents.includes(selectedEvent.id)
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-purple-700 hover:bg-purple-800"
                  }
                  onClick={() => handleRegister(selectedEvent.id)}
                  disabled={isRegistering === selectedEvent.id}
                >
                  {isRegistering === selectedEvent.id
                    ? "Processing..."
                    : registeredEvents.includes(selectedEvent.id)
                      ? "Registered ✓"
                      : "Register Now"}
                </Button>
                <Button variant="outline" onClick={() => setShowDetailsModal(false)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}
