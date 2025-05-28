"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Users, Calendar, FileText, Megaphone, MessageSquare } from "lucide-react"

interface SearchResultsProps {
  query: string
  setActiveSection: (section: string) => void
}

export function SearchResults({ query, setActiveSection }: SearchResultsProps) {
  // Mock search results - in a real app, this would come from an API
  const searchResults = {
    students: [
      {
        id: 1,
        name: "Alice Namukasa",
        email: "alice.namukasa@ndejje.ac.ug",
        department: "Computer Science",
        year: "Year 3",
      },
      {
        id: 2,
        name: "Robert Ssemakula",
        email: "robert.ssemakula@ndejje.ac.ug",
        department: "Business Administration",
        year: "Year 2",
      },
    ],
    events: [
      {
        id: 1,
        title: "Guild Elections 2024",
        date: "2024-04-15",
        location: "Main Auditorium",
      },
      {
        id: 2,
        title: "Career Fair 2024",
        date: "2024-04-08",
        location: "Sports Complex",
      },
    ],
    announcements: [
      {
        id: 1,
        title: "Guild Election Nominations Now Open",
        author: "Sarah Nakato",
        date: "2024-03-30",
      },
      {
        id: 2,
        title: "Library Hours Extended During Exam Period",
        author: "Peter Kato",
        date: "2024-03-29",
      },
    ],
    resources: [
      {
        id: 1,
        title: "Student Handbook 2024",
        category: "handbook",
        size: "2.5 MB",
      },
      {
        id: 2,
        title: "Academic Calendar",
        category: "academic",
        size: "1.2 MB",
      },
    ],
    inquiries: [
      {
        id: 1,
        subject: "Library Access Hours",
        status: "resolved",
        date: "2024-03-28",
      },
    ],
  }

  const totalResults = Object.values(searchResults).reduce((sum, arr) => sum + arr.length, 0)

  return (
    <div className="p-6">
      <div className="border-2 border-purple-300 rounded-xl p-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Search Results</h1>
          <p className="text-gray-600">
            Found {totalResults} results for "{query}"
          </p>
        </div>

        {totalResults === 0 ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try searching with different keywords</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Students Results */}
            {searchResults.students.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Users className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Students ({searchResults.students.length})</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {searchResults.students.map((student) => (
                    <Card
                      key={student.id}
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setActiveSection("students")}
                    >
                      <CardContent className="p-4">
                        <h3 className="font-medium text-gray-900">{student.name}</h3>
                        <p className="text-sm text-gray-600">{student.email}</p>
                        <p className="text-sm text-gray-600">
                          {student.department} • {student.year}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Events Results */}
            {searchResults.events.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Events ({searchResults.events.length})</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {searchResults.events.map((event) => (
                    <Card
                      key={event.id}
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setActiveSection("events")}
                    >
                      <CardContent className="p-4">
                        <h3 className="font-medium text-gray-900">{event.title}</h3>
                        <p className="text-sm text-gray-600">
                          {event.date} • {event.location}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Announcements Results */}
            {searchResults.announcements.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Megaphone className="w-5 h-5 text-green-600" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Announcements ({searchResults.announcements.length})
                  </h2>
                </div>
                <div className="space-y-3">
                  {searchResults.announcements.map((announcement) => (
                    <Card
                      key={announcement.id}
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setActiveSection("announcements")}
                    >
                      <CardContent className="p-4">
                        <h3 className="font-medium text-gray-900">{announcement.title}</h3>
                        <p className="text-sm text-gray-600">
                          By {announcement.author} • {announcement.date}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Resources Results */}
            {searchResults.resources.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <FileText className="w-5 h-5 text-yellow-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Resources ({searchResults.resources.length})</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {searchResults.resources.map((resource) => (
                    <Card
                      key={resource.id}
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setActiveSection("resources")}
                    >
                      <CardContent className="p-4">
                        <h3 className="font-medium text-gray-900">{resource.title}</h3>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="secondary">{resource.category}</Badge>
                          <span className="text-sm text-gray-600">{resource.size}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Inquiries Results */}
            {searchResults.inquiries.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-red-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Inquiries ({searchResults.inquiries.length})</h2>
                </div>
                <div className="space-y-3">
                  {searchResults.inquiries.map((inquiry) => (
                    <Card
                      key={inquiry.id}
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setActiveSection("inquiries")}
                    >
                      <CardContent className="p-4">
                        <h3 className="font-medium text-gray-900">{inquiry.subject}</h3>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="secondary">{inquiry.status}</Badge>
                          <span className="text-sm text-gray-600">{inquiry.date}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
