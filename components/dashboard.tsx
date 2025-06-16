"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Users, Calendar, MessageSquare, Megaphone } from "lucide-react"

interface DashboardProps {
  setActiveSection: (section: string) => void
}

export function Dashboard({ setActiveSection }: DashboardProps) {
  return (
    <div className="p-3 sm:p-4 lg:p-6">
      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 lg:mb-6 space-y-2 sm:space-y-0">
        <Button variant="outline" className="flex items-center space-x-2 w-full sm:w-auto">
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>
        <Button className="bg-purple-700 hover:bg-purple-800 flex items-center space-x-2 w-full sm:w-auto">
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="border-2 border-purple-300 rounded-xl p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
          Welcome to Ndejje Guild Connect
        </h1>
        <p className="text-gray-600 mb-6 lg:mb-8 text-sm sm:text-base max-w-3xl">
          Your central hub for connecting with the guild department. Access guild council information, submit inquiries,
          stay updated with announcements, and participate in upcoming events. Building stronger connections between
          students and guild leadership.
        </p>

        {/* Navigation Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Guild Members Button */}
          <button
            onClick={() => setActiveSection("guild-members")}
            className="group bg-purple-100 hover:bg-purple-200 border-2 border-purple-200 hover:border-purple-300 rounded-xl p-6 lg:p-8 transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <div className="flex flex-col items-center text-center space-y-3 lg:space-y-4">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-purple-200 group-hover:bg-purple-300 rounded-full flex items-center justify-center transition-colors">
                <Users className="w-8 h-8 lg:w-10 lg:h-10 text-purple-700" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 group-hover:text-purple-800 transition-colors">
                Guild Members
              </h3>
            </div>
          </button>

          {/* Student Inquiries Button */}
          <button
            onClick={() => setActiveSection("inquiries")}
            className="group bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 hover:border-blue-300 rounded-xl p-6 lg:p-8 transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <div className="flex flex-col items-center text-center space-y-3 lg:space-y-4">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors">
                <MessageSquare className="w-8 h-8 lg:w-10 lg:h-10 text-blue-700" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 group-hover:text-blue-800 transition-colors">
                Student Inquiries
              </h3>
            </div>
          </button>

          {/* Events Button */}
          <button
            onClick={() => setActiveSection("events")}
            className="group bg-yellow-50 hover:bg-yellow-100 border-2 border-yellow-200 hover:border-yellow-300 rounded-xl p-6 lg:p-8 transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            <div className="flex flex-col items-center text-center space-y-3 lg:space-y-4">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-yellow-100 group-hover:bg-yellow-200 rounded-full flex items-center justify-center transition-colors">
                <Calendar className="w-8 h-8 lg:w-10 lg:h-10 text-yellow-700" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 group-hover:text-yellow-800 transition-colors">
                Events
              </h3>
            </div>
          </button>

          {/* Announcements Button */}
          <button
            onClick={() => setActiveSection("announcements")}
            className="group bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-300 rounded-xl p-6 lg:p-8 transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <div className="flex flex-col items-center text-center space-y-3 lg:space-y-4">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-green-100 group-hover:bg-green-200 rounded-full flex items-center justify-center transition-colors">
                <Megaphone className="w-8 h-8 lg:w-10 lg:h-10 text-green-700" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 group-hover:text-green-800 transition-colors">
                Announcements
              </h3>
            </div>
          </button>
        </div>

        {/* Quick Alert */}
        <div className="mt-6 lg:mt-8 p-3 lg:p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-sm lg:text-base">
            📢 New guild election nominations are now open!{" "}
            <button
              className="underline font-medium hover:text-blue-900 transition-colors"
              onClick={() => setActiveSection("announcements")}
            >
              Learn more about the process
            </button>
            . Nominations close on April 15th.
          </p>
        </div>
      </div>
    </div>
  )
}
