"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Users, Calendar, MessageSquare, Megaphone } from "lucide-react"

interface DashboardProps {
  setActiveSection: (section: string) => void
}

export function Dashboard({ setActiveSection }: DashboardProps) {
  return (
    <div className="p-4 md:p-6">
      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-2 sm:space-y-0">
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Ndejje Guild Connect</h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Your central hub for connecting with the guild department. Access guild council information, submit inquiries,
          stay updated with announcements, and participate in upcoming events. Building stronger connections between
          students and guild leadership.
        </p>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Guild Members Card */}
          <Card className="bg-purple-100 border-purple-200">
            <CardHeader>
              <div className="w-16 h-16 bg-purple-200 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-purple-700" />
              </div>
              <CardTitle className="text-xl">Guild Members</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Connect with guild council members and representatives. View profiles, contact information, and areas of
                responsibility for better communication.
              </p>
              <Button variant="link" className="text-purple-700 p-0" onClick={() => setActiveSection("guild-members")}>
                View guild directory →
              </Button>
            </CardContent>
          </Card>

          {/* Student Inquiries Card */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-blue-700" />
              </div>
              <CardTitle className="text-xl">Student Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Submit your questions, requests, or concerns directly to the guild council. Track your inquiry status
                and receive timely responses.
              </p>
              <Button variant="link" className="text-blue-700 p-0" onClick={() => setActiveSection("inquiries")}>
                Submit inquiry →
              </Button>
            </CardContent>
          </Card>

          {/* Events Card */}
          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader>
              <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-yellow-700" />
              </div>
              <CardTitle className="text-xl">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Stay informed about guild events, meetings, workshops, and activities. Register for events and add them
                to your calendar.
              </p>
              <Button variant="link" className="text-yellow-700 p-0" onClick={() => setActiveSection("events")}>
                View events calendar →
              </Button>
            </CardContent>
          </Card>

          {/* Announcements Card */}
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Megaphone className="w-8 h-8 text-green-700" />
              </div>
              <CardTitle className="text-xl">Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Get the latest news, updates, and important announcements from the guild. Never miss important
                information that affects student life.
              </p>
              <Button variant="link" className="text-green-700 p-0" onClick={() => setActiveSection("announcements")}>
                Read announcements →
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Alert */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800">
            📢 New guild election nominations are now open!
            <a href="#" className="underline font-medium">
              Learn more about the process
            </a>
            . Nominations close on April 15th.
          </p>
        </div>
      </div>
    </div>
  )
}
