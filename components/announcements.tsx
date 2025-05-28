"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Megaphone, Calendar, User, Pin, Heart, MessageCircle, Share2 } from "lucide-react"
import { useState } from "react"

export function Announcements() {
  const [likedAnnouncements, setLikedAnnouncements] = useState<number[]>([])
  const [showComments, setShowComments] = useState<number | null>(null)
  const [newComment, setNewComment] = useState("")

  const announcements = [
    {
      id: 1,
      title: "Guild Election Nominations Now Open",
      content:
        "We are excited to announce that nominations for the 2024 Guild Council elections are now open! Students interested in serving their fellow students can submit their nomination forms starting today. The nomination period will run until April 10th, 2024. Election campaigns will begin on April 12th, and voting will take place on April 15th, 2024.",
      author: "Sarah Nakato",
      authorRole: "Guild President",
      date: "2024-03-30",
      category: "Elections",
      priority: "high",
      likes: 45,
      comments: 12,
      pinned: true,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "Library Hours Extended During Exam Period",
      content:
        "To support students during the upcoming examination period, the university library will extend its operating hours. Starting April 1st, the library will be open from 6:00 AM to 11:00 PM on weekdays and 8:00 AM to 8:00 PM on weekends. Additional study spaces have been arranged in the conference halls.",
      author: "Peter Kato",
      authorRole: "Academic Minister",
      date: "2024-03-29",
      category: "Academic",
      priority: "medium",
      likes: 78,
      comments: 8,
      pinned: false,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "New Sports Equipment Available",
      content:
        "Great news for all sports enthusiasts! The guild has successfully acquired new sports equipment including basketball hoops, volleyball nets, football goals, and table tennis tables. The equipment is now available for use at the sports complex. Students can book equipment through the sports office.",
      author: "Mary Nakirya",
      authorRole: "Sports Minister",
      date: "2024-03-28",
      category: "Sports",
      priority: "medium",
      likes: 92,
      comments: 15,
      pinned: false,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 4,
      title: "Mental Health Support Services",
      content:
        "Your mental health matters! The guild, in partnership with the university counseling center, is launching enhanced mental health support services. Free counseling sessions are available every Tuesday and Thursday from 2:00 PM to 5:00 PM. Additionally, peer support groups meet every Friday at 4:00 PM in the student center.",
      author: "Grace Namuli",
      authorRole: "Secretary General",
      date: "2024-03-27",
      category: "Wellness",
      priority: "high",
      likes: 156,
      comments: 23,
      pinned: true,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 5,
      title: "Student Accommodation Updates",
      content:
        "Important updates regarding student accommodation: Room allocation for the next semester will begin on April 5th. Students currently in hostels will have priority for renewal. New applications can be submitted online through the student portal. The accommodation office will also be conducting routine maintenance in all hostels during the semester break.",
      author: "James Mukasa",
      authorRole: "Vice President",
      date: "2024-03-26",
      category: "Accommodation",
      priority: "medium",
      likes: 67,
      comments: 19,
      pinned: false,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 6,
      title: "Financial Aid Application Deadline",
      content:
        "Reminder: The deadline for financial aid applications for the next academic year is April 20th, 2024. Students experiencing financial difficulties are encouraged to apply. Required documents include academic transcripts, family income statements, and a personal statement. The financial aid office is available for consultations every weekday from 9:00 AM to 4:00 PM.",
      author: "David Ssemakula",
      authorRole: "Treasurer",
      date: "2024-03-25",
      category: "Financial",
      priority: "high",
      likes: 134,
      comments: 31,
      pinned: false,
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "elections":
        return "bg-purple-100 text-purple-800"
      case "academic":
        return "bg-blue-100 text-blue-800"
      case "sports":
        return "bg-green-100 text-green-800"
      case "wellness":
        return "bg-pink-100 text-pink-800"
      case "accommodation":
        return "bg-yellow-100 text-yellow-800"
      case "financial":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleLike = (announcementId: number) => {
    setLikedAnnouncements((prev) =>
      prev.includes(announcementId) ? prev.filter((id) => id !== announcementId) : [...prev, announcementId],
    )
  }

  const handleComment = (announcementId: number) => {
    setShowComments(showComments === announcementId ? null : announcementId)
  }

  const submitComment = (announcementId: number) => {
    if (newComment.trim()) {
      // Here you would typically send the comment to your backend
      console.log(`Comment for announcement ${announcementId}: ${newComment}`)
      setNewComment("")
      setShowComments(null)
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Guild Announcements</h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Stay informed with the latest news, updates, and important announcements from your guild council. We're
          committed to keeping you updated on everything that affects student life at Ndejje University.
        </p>

        {/* Announcements List */}
        <div className="space-y-6">
          {announcements.map((announcement) => (
            <Card
              key={announcement.id}
              className={`hover:shadow-lg transition-shadow ${announcement.pinned ? "ring-2 ring-purple-200" : ""}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {announcement.pinned && <Pin className="w-4 h-4 text-purple-600" />}
                      <Badge className={getCategoryColor(announcement.category)}>{announcement.category}</Badge>
                      <Badge variant="outline" className={getPriorityColor(announcement.priority)}>
                        {announcement.priority} priority
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-gray-900 mb-2">
                      {announcement.pinned && <Megaphone className="w-5 h-5 inline mr-2 text-purple-600" />}
                      {announcement.title}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{announcement.author}</span>
                        <span className="text-gray-400">•</span>
                        <span>{announcement.authorRole}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(announcement.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Announcement Image */}
                {announcement.image && (
                  <img
                    src={announcement.image || "/placeholder.svg"}
                    alt={announcement.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}

                {/* Content */}
                <p className="text-gray-700 leading-relaxed">{announcement.content}</p>

                {/* Engagement Stats and Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{announcement.likes} likes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{announcement.comments} comments</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`${
                        likedAnnouncements.includes(announcement.id)
                          ? "text-red-600 hover:text-red-700"
                          : "text-gray-600 hover:text-purple-700"
                      }`}
                      onClick={() => handleLike(announcement.id)}
                    >
                      <Heart
                        className={`w-4 h-4 mr-1 ${likedAnnouncements.includes(announcement.id) ? "fill-current" : ""}`}
                      />
                      {likedAnnouncements.includes(announcement.id) ? "Liked" : "Like"}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-gray-600 hover:text-purple-700"
                      onClick={() => handleComment(announcement.id)}
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Comment
                    </Button>
                    <Button size="sm" variant="ghost" className="text-gray-600 hover:text-purple-700">
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
              {showComments === announcement.id && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <Button
                      size="sm"
                      onClick={() => submitComment(announcement.id)}
                      className="bg-purple-700 hover:bg-purple-800"
                    >
                      Post
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
            Load More Announcements
          </Button>
        </div>

        {/* Notification Settings */}
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">📱 Stay Updated</h3>
          <p className="text-blue-800 text-sm mb-4">
            Never miss important announcements! Enable notifications to get instant updates on your phone or email.
          </p>
          <div className="flex space-x-3">
            <Button size="sm" className="bg-blue-700 hover:bg-blue-800">
              Enable Push Notifications
            </Button>
            <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
              Email Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
