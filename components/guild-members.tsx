"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, ArrowLeft, ArrowRight } from "lucide-react"
import { useState } from "react"

export function GuildMembers() {
  const [selectedMember, setSelectedMember] = useState<number | null>(null)
  const [message, setMessage] = useState("")
  const [isSending, setIsSending] = useState(false)

  const handleSendMessage = async (memberId: number) => {
    setIsSending(true)

    try {
      // Simulate sending message
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log(`Message sent to member ${memberId}: ${message}`)
      setMessage("")
      setSelectedMember(null)

      // Show success notification
      alert("Message sent successfully!")
    } catch (error) {
      alert("Failed to send message. Please try again.")
    } finally {
      setIsSending(false)
    }
  }

  const guildMembers = [
    {
      id: 1,
      name: "Sarah Nakato",
      position: "Guild President",
      department: "Business Administration",
      year: "Year 3",
      email: "sarah.nakato@ndejje.ac.ug",
      phone: "+256 700 123 456",
      office: "Guild Office - Room 101",
      responsibilities: ["Student Welfare", "Academic Affairs", "Leadership"],
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "James Mukasa",
      position: "Vice President",
      department: "Computer Science",
      year: "Year 4",
      email: "james.mukasa@ndejje.ac.ug",
      phone: "+256 700 234 567",
      office: "Guild Office - Room 102",
      responsibilities: ["Technology", "Innovation", "Student Projects"],
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Grace Namuli",
      position: "Secretary General",
      department: "Mass Communication",
      year: "Year 2",
      email: "grace.namuli@ndejje.ac.ug",
      phone: "+256 700 345 678",
      office: "Guild Office - Room 103",
      responsibilities: ["Communications", "Documentation", "Public Relations"],
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      name: "David Ssemakula",
      position: "Treasurer",
      department: "Accounting & Finance",
      year: "Year 3",
      email: "david.ssemakula@ndejje.ac.ug",
      phone: "+256 700 456 789",
      office: "Guild Office - Room 104",
      responsibilities: ["Finance", "Budget Management", "Fundraising"],
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 5,
      name: "Mary Nakirya",
      position: "Sports Minister",
      department: "Sports Science",
      year: "Year 2",
      email: "mary.nakirya@ndejje.ac.ug",
      phone: "+256 700 567 890",
      office: "Sports Complex - Office 201",
      responsibilities: ["Sports Activities", "Recreation", "Health & Fitness"],
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 6,
      name: "Peter Kato",
      position: "Academic Minister",
      department: "Education",
      year: "Year 4",
      email: "peter.kato@ndejje.ac.ug",
      phone: "+256 700 678 901",
      office: "Academic Block - Room 305",
      responsibilities: ["Academic Affairs", "Student Support", "Research"],
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Guild Council Members</h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Meet your elected guild council representatives. Each member is dedicated to serving student interests and
          improving campus life. Feel free to reach out to them with your concerns, suggestions, or questions.
        </p>

        {/* Members Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {guildMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-purple-200"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-xl text-gray-900">{member.name}</CardTitle>
                    <p className="text-purple-700 font-semibold">{member.position}</p>
                    <p className="text-gray-600">
                      {member.department} • {member.year}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Contact Information */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{member.office}</span>
                  </div>
                </div>

                {/* Responsibilities */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Areas of Responsibility:</p>
                  <div className="flex flex-wrap gap-1">
                    {member.responsibilities.map((responsibility, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {responsibility}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <Button
                    size="sm"
                    className="bg-purple-700 hover:bg-purple-800"
                    onClick={() => setSelectedMember(member.id)}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button size="sm" variant="outline">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">
                Send Message to {guildMembers.find((m) => m.id === selectedMember)?.name}
              </h3>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="flex space-x-2 mt-4">
                <Button
                  onClick={() => handleSendMessage(selectedMember)}
                  disabled={!message.trim() || isSending}
                  className="bg-purple-700 hover:bg-purple-800"
                >
                  {isSending ? "Sending..." : "Send Message"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedMember(null)
                    setMessage("")
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="mt-8 p-6 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-900 mb-2">Guild Office Hours</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-purple-800">
            <div>
              <p>
                <strong>Monday - Friday:</strong> 8:00 AM - 5:00 PM
              </p>
              <p>
                <strong>Saturday:</strong> 9:00 AM - 1:00 PM
              </p>
              <p>
                <strong>Sunday:</strong> Closed
              </p>
            </div>
            <div>
              <p>
                <strong>Emergency Contact:</strong> +256 700 000 000
              </p>
              <p>
                <strong>General Email:</strong> guild@ndejje.ac.ug
              </p>
              <p>
                <strong>Location:</strong> Main Campus, Student Center
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
