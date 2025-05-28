"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Calendar, Clock, MapPin, Users, ExternalLink } from "lucide-react"
import { useState } from "react"

export function Events() {
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([])
  const [isRegistering, setIsRegistering] = useState<number | null>(null)

  const upcomingEvents = [
    {
      id: 1,
      title: "Guild Elections 2024",
      date: "2024-04-15",
      time: "9:00 AM - 5:00 PM",
      location: "Main Auditorium",
      category: "Elections",
      description:
        "Annual guild council elections. All students are encouraged to vote for their preferred candidates.",
      attendees: 1200,
      status: "upcoming",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Career Fair 2024",
      date: "2024-04-08",
      time: "10:00 AM - 4:00 PM",
      location: "Sports Complex",
      category: "Career",
      description:
        "Meet with potential employers, learn about internship opportunities, and network with industry professionals.",
      attendees: 800,
      status: "upcoming",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Cultural Night",
      date: "2024-04-20",
      time: "6:00 PM - 11:00 PM",
      location: "University Grounds",
      category: "Cultural",
      description: "Celebrate the diversity of our student body with performances, food, and cultural exhibitions.",
      attendees: 600,
      status: "upcoming",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Academic Excellence Awards",
      date: "2024-04-25",
      time: "2:00 PM - 5:00 PM",
      location: "Conference Hall",
      category: "Academic",
      description: "Recognition ceremony for outstanding academic achievements and student contributions.",
      attendees: 400,
      status: "upcoming",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      title: "Sports Tournament Finals",
      date: "2024-04-30",
      time: "1:00 PM - 6:00 PM",
      location: "Sports Fields",
      category: "Sports",
      description: "Final matches of the inter-faculty sports tournament. Come support your faculty teams!",
      attendees: 1000,
      status: "upcoming",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      title: "Mental Health Awareness Week",
      date: "2024-05-06",
      time: "All Week",
      location: "Various Locations",
      category: "Wellness",
      description:
        "A week dedicated to mental health awareness with workshops, counseling sessions, and wellness activities.",
      attendees: 500,
      status: "upcoming",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Stay updated with all the exciting events happening at Ndejje University. From academic conferences to
          cultural celebrations, sports tournaments to career fairs - there's always something happening on campus!
        </p>

        {/* Events Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={getCategoryColor(event.category)}>{event.category}</Badge>
                      <Badge variant="outline" className="text-green-700 border-green-300">
                        {event.status}
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
                  <Button size="sm" variant="outline">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    More Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
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
    </div>
  )
}
