"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Users, FileText, TrendingUp, MessageSquare, CheckCircle, Clock, AlertCircle } from "lucide-react"

export function GuildCouncil() {
  const [activeTab, setActiveTab] = useState("overview")

  const councilStats = {
    totalMembers: 12,
    activeProjects: 8,
    completedTasks: 45,
    pendingInquiries: 12,
    upcomingMeetings: 3,
    budget: 2500000,
  }

  const recentActivities = [
    {
      id: 1,
      type: "meeting",
      title: "Weekly Council Meeting",
      description: "Discussed upcoming events and budget allocation",
      date: "2024-03-29",
      status: "completed",
    },
    {
      id: 2,
      type: "project",
      title: "Sports Equipment Purchase",
      description: "Approved purchase of new sports equipment",
      date: "2024-03-28",
      status: "in-progress",
    },
    {
      id: 3,
      type: "inquiry",
      title: "Library Hours Extension",
      description: "Student request for extended library hours",
      date: "2024-03-27",
      status: "pending",
    },
  ]

  const upcomingMeetings = [
    {
      id: 1,
      title: "Budget Review Meeting",
      date: "2024-04-02",
      time: "2:00 PM",
      location: "Guild Office",
      attendees: 8,
    },
    {
      id: 2,
      title: "Event Planning Session",
      date: "2024-04-05",
      time: "10:00 AM",
      location: "Conference Room A",
      attendees: 6,
    },
    {
      id: 3,
      title: "Student Feedback Review",
      date: "2024-04-08",
      time: "3:00 PM",
      location: "Guild Office",
      attendees: 10,
    },
  ]

  const projects = [
    {
      id: 1,
      title: "Campus WiFi Improvement",
      description: "Upgrading internet infrastructure across campus",
      progress: 75,
      status: "in-progress",
      deadline: "2024-04-15",
      budget: 500000,
    },
    {
      id: 2,
      title: "Student Mental Health Program",
      description: "Implementing comprehensive mental health support",
      progress: 60,
      status: "in-progress",
      deadline: "2024-05-01",
      budget: 300000,
    },
    {
      id: 3,
      title: "Library Renovation",
      description: "Modernizing library facilities and study spaces",
      progress: 90,
      status: "near-completion",
      deadline: "2024-03-31",
      budget: 800000,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "pending":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      case "near-completion":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6">
      <div className="border-2 border-purple-300 rounded-xl p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Guild Council Dashboard</h1>
            <p className="text-gray-600">Manage council activities, projects, and student affairs</p>
          </div>
          <Button className="bg-purple-700 hover:bg-purple-800 mt-4 md:mt-0">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{councilStats.totalMembers}</div>
                  <div className="text-sm text-gray-600">Council Members</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{councilStats.activeProjects}</div>
                  <div className="text-sm text-gray-600">Active Projects</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{councilStats.completedTasks}</div>
                  <div className="text-sm text-gray-600">Completed Tasks</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <MessageSquare className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{councilStats.pendingInquiries}</div>
                  <div className="text-sm text-gray-600">Pending Inquiries</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Calendar className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{councilStats.upcomingMeetings}</div>
                  <div className="text-sm text-gray-600">Upcoming Meetings</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">UGX {councilStats.budget.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Available Budget</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg"
                      >
                        {getStatusIcon(activity.status)}
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{activity.title}</h4>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">{activity.date}</span>
                            <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Meetings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingMeetings.map((meeting) => (
                      <div key={meeting.id} className="p-3 border border-gray-200 rounded-lg">
                        <h4 className="font-medium text-gray-900">{meeting.title}</h4>
                        <div className="mt-2 space-y-1 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {meeting.date} at {meeting.time}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>
                              {meeting.attendees} attendees • {meeting.location}
                            </span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="mt-2">
                          Join Meeting
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">{project.description}</p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Deadline:</span>
                        <p className="font-medium">{project.deadline}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Budget:</span>
                        <p className="font-medium">UGX {project.budget.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-purple-700 hover:bg-purple-800">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Update Progress
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="meetings" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Schedule New Meeting</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Title</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter meeting title"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                      <input
                        type="time"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Meeting location"
                    />
                  </div>
                  <Button className="w-full bg-purple-700 hover:bg-purple-800">Schedule Meeting</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Meeting History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingMeetings.map((meeting) => (
                      <div key={meeting.id} className="p-3 border border-gray-200 rounded-lg">
                        <h4 className="font-medium">{meeting.title}</h4>
                        <p className="text-sm text-gray-600">
                          {meeting.date} • {meeting.attendees} attendees
                        </p>
                        <Button size="sm" variant="outline" className="mt-2">
                          View Minutes
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Completion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">85%</div>
                    <p className="text-gray-600">Projects completed on time</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Student Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">4.2/5</div>
                    <p className="text-gray-600">Average satisfaction rating</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Budget Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">72%</div>
                    <p className="text-gray-600">Budget utilized this semester</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-600 mb-2">24h</div>
                    <p className="text-gray-600">Average inquiry response time</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
