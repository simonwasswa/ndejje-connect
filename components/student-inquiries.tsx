"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Send, Clock, CheckCircle, AlertCircle, MessageSquare, Edit } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { RoleBasedComponent } from "@/components/auth/role-based-component"

export function StudentInquiries() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    category: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const { user, hasPermission } = useAuth()

  const recentInquiries = [
    {
      id: 1,
      subject: "Library Access Hours",
      category: "Academic",
      status: "resolved",
      date: "2024-03-28",
      response: "Library hours have been extended until 10 PM on weekdays.",
    },
    {
      id: 2,
      subject: "Sports Equipment Request",
      category: "Sports",
      status: "pending",
      date: "2024-03-27",
      response: null,
    },
    {
      id: 3,
      subject: "Hostel Maintenance Issue",
      category: "Accommodation",
      status: "in-progress",
      date: "2024-03-26",
      response: "Maintenance team has been notified and will address this within 48 hours.",
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate success
      setSubmitStatus("success")
      setFormData({
        name: "",
        email: "",
        studentId: "",
        category: "",
        subject: "",
        message: "",
      })

      // Reset success message after 3 seconds
      setTimeout(() => setSubmitStatus("idle"), 3000)
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
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
      case "resolved":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Student Inquiries</h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Have a question, concern, or suggestion for the guild council? Submit your inquiry below and we'll get back to
          you as soon as possible. You can also track the status of your previous inquiries.
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Inquiry Form */}
          <RoleBasedComponent allowedRoles={["student", "admin"]}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Send className="w-5 h-5 text-purple-700" />
                  <span>Submit New Inquiry</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="studentId">Student ID</Label>
                      <Input
                        id="studentId"
                        value={formData.studentId}
                        onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                        required
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
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="academic">Academic Affairs</option>
                      <option value="accommodation">Accommodation</option>
                      <option value="sports">Sports & Recreation</option>
                      <option value="welfare">Student Welfare</option>
                      <option value="finance">Financial Matters</option>
                      <option value="events">Events & Activities</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please provide detailed information about your inquiry..."
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-800" disabled={isSubmitting}>
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </RoleBasedComponent>

          {submitStatus === "success" && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm">
                ✅ Your inquiry has been submitted successfully! We'll get back to you within 24-48 hours.
              </p>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">❌ There was an error submitting your inquiry. Please try again.</p>
            </div>
          )}

          {/* Recent Inquiries */}
          <Card>
            <CardHeader>
              <CardTitle>Your Recent Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{inquiry.subject}</h4>
                      <Badge className={getStatusColor(inquiry.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(inquiry.status)}
                          <span className="capitalize">{inquiry.status}</span>
                        </div>
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <span>Category: {inquiry.category}</span>
                      <span>Date: {inquiry.date}</span>
                    </div>
                    {inquiry.response && (
                      <div className="mt-2 p-3 bg-gray-50 rounded border-l-4 border-purple-500">
                        <p className="text-sm text-gray-700">
                          <strong>Response:</strong> {inquiry.response}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <RoleBasedComponent allowedRoles={["admin"]}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-green-700" />
                  <span>Admin Response Panel</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    As an administrator, you can respond to and manage all student inquiries.
                  </p>
                  <div className="flex space-x-2">
                    <Button className="bg-green-700 hover:bg-green-800">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Respond to Inquiries
                    </Button>
                    <Button variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Manage Categories
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </RoleBasedComponent>
        </div>

        {/* Contact Information */}
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Immediate Assistance?</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-800">
            <div>
              <p>
                <strong>Emergency:</strong> +256 700 000 000
              </p>
              <p>
                <strong>Guild Office:</strong> +256 700 111 111
              </p>
            </div>
            <div>
              <p>
                <strong>Email:</strong> guild@ndejje.ac.ug
              </p>
              <p>
                <strong>WhatsApp:</strong> +256 700 222 222
              </p>
            </div>
            <div>
              <p>
                <strong>Office Hours:</strong> Mon-Fri 8AM-5PM
              </p>
              <p>
                <strong>Location:</strong> Student Center, Room 101
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
