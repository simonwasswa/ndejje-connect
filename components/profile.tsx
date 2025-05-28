"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, Mail, GraduationCap, Settings, Shield, Camera } from "lucide-react"

interface ProfileProps {
  user: any
  setUser: (user: any) => void
}

export function Profile({ user, setUser }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(user)

  const handleSave = () => {
    setUser(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData(user)
    setIsEditing(false)
  }

  return (
    <div className="p-6">
      <div className="border-2 border-purple-300 rounded-xl p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile</h1>
            <p className="text-gray-600">Manage your account settings and preferences</p>
          </div>
          <Button className="bg-purple-700 hover:bg-purple-800 mt-4 md:mt-0" onClick={() => setIsEditing(!isEditing)}>
            <Settings className="w-4 h-4 mr-2" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Profile Picture */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="relative inline-block">
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-purple-200"
                    />
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0 bg-purple-700 hover:bg-purple-800"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">Upload a new profile picture</p>
                </CardContent>
              </Card>

              {/* Basic Information */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="studentId">Student ID</Label>
                          <Input
                            id="studentId"
                            value={formData.studentId}
                            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                            disabled
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="department">Department</Label>
                          <select
                            id="department"
                            value={formData.department}
                            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="Computer Science">Computer Science</option>
                            <option value="Business Administration">Business Administration</option>
                            <option value="Mass Communication">Mass Communication</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Education">Education</option>
                            <option value="Medicine">Medicine</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="year">Academic Year</Label>
                          <select
                            id="year"
                            value={formData.year}
                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="Year 1">Year 1</option>
                            <option value="Year 2">Year 2</option>
                            <option value="Year 3">Year 3</option>
                            <option value="Year 4">Year 4</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={handleSave} className="bg-purple-700 hover:bg-purple-800">
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={handleCancel}>
                          Cancel
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-600">Full Name</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium">{user.email}</p>
                          <p className="text-sm text-gray-600">Email Address</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <GraduationCap className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium">{user.studentId}</p>
                          <p className="text-sm text-gray-600">Student ID</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant="secondary">{user.role}</Badge>
                        <Badge variant="outline">{user.department}</Badge>
                        <Badge variant="outline">{user.year}</Badge>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="academic" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Department</p>
                    <p className="font-medium">{user.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Academic Year</p>
                    <p className="font-medium">{user.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Student ID</p>
                    <p className="font-medium">{user.studentId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Enrollment Status</p>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Academic Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Current GPA</p>
                    <p className="text-2xl font-bold text-purple-700">3.7</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Credits Completed</p>
                    <p className="font-medium">85/120</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Expected Graduation</p>
                    <p className="font-medium">May 2025</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Password & Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button className="bg-purple-700 hover:bg-purple-800">
                    <Shield className="w-4 h-4 mr-2" />
                    Update Password
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">Add an extra layer of security to your account</p>
                  <div className="flex items-center justify-between">
                    <span>SMS Authentication</span>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Email Authentication</span>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <span>Email notifications</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span>Push notifications</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span>Event reminders</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span>Announcement alerts</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span>Guild updates</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <span>Show profile in student directory</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span>Allow direct messages</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span>Show academic information</span>
                    <input type="checkbox" className="rounded" />
                  </label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
