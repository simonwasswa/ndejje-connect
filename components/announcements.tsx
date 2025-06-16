"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Megaphone, Calendar, User, Pin, Heart, MessageCircle, Share2 } from "lucide-react"
import { useState, useEffect } from "react"
import { announcementStore, type Announcement } from "@/lib/announcement-store"

export function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [likedAnnouncements, setLikedAnnouncements] = useState<number[]>([])
  const [showComments, setShowComments] = useState<number | null>(null)
  const [newComment, setNewComment] = useState("")

  // Load announcements and subscribe to changes
  useEffect(() => {
    // Initial load
    setAnnouncements(announcementStore.getAnnouncements())

    // Subscribe to real-time updates
    const unsubscribe = announcementStore.subscribe(() => {
      setAnnouncements(announcementStore.getAnnouncements())
    })

    // Cleanup subscription on unmount
    return unsubscribe
  }, [])

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
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Guild Announcements</h1>
            <p className="text-gray-600 mb-8 max-w-3xl">
              Stay informed with the latest news, updates, and important announcements from your guild council. We're
              committed to keeping you updated on everything that affects student life at Ndejje University.
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-700 font-medium">Live Updates</span>
            </div>
            <p className="text-xs text-green-600 mt-1">Real-time announcements from admin</p>
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-6">
          {announcements.length === 0 ? (
            <div className="text-center py-12">
              <Megaphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Announcements Yet</h3>
              <p className="text-gray-600">Check back later for updates from the guild council!</p>
            </div>
          ) : (
            announcements.map((announcement) => (
              <Card
                key={announcement.id}
                className={`hover:shadow-lg transition-all duration-300 ${
                  announcement.pinned ? "ring-2 ring-purple-200 shadow-md" : ""
                } ${announcement.status === "published" ? "animate-fadeIn" : ""}`}
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
                        {announcement.status === "published" && (
                          <Badge className="bg-green-100 text-green-800">
                            <div className="flex items-center space-x-1">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                              <span>Live</span>
                            </div>
                          </Badge>
                        )}
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
                          className={`w-4 h-4 mr-1 ${
                            likedAnnouncements.includes(announcement.id) ? "fill-current" : ""
                          }`}
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
            ))
          )}
        </div>

        {/* Load More */}
        {announcements.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
              Load More Announcements
            </Button>
          </div>
        )}

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
