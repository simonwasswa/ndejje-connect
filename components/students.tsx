"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Mail, Phone, MapPin, GraduationCap, Users, BookOpen } from "lucide-react"

export function Students() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")

  const students = [
    {
      id: 1,
      name: "Alice Namukasa",
      email: "alice.namukasa@ndejje.ac.ug",
      studentId: "ND2024001",
      department: "Computer Science",
      year: "Year 3",
      phone: "+256 700 111 111",
      hostel: "Block A - Room 205",
      gpa: 3.8,
      status: "active",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "Robert Ssemakula",
      email: "robert.ssemakula@ndejje.ac.ug",
      studentId: "ND2024002",
      department: "Business Administration",
      year: "Year 2",
      phone: "+256 700 222 222",
      hostel: "Block B - Room 101",
      gpa: 3.5,
      status: "active",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      name: "Grace Nakato",
      email: "grace.nakato@ndejje.ac.ug",
      studentId: "ND2024003",
      department: "Mass Communication",
      year: "Year 4",
      phone: "+256 700 333 333",
      hostel: "Block C - Room 304",
      gpa: 3.9,
      status: "active",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 4,
      name: "David Mukasa",
      email: "david.mukasa@ndejje.ac.ug",
      studentId: "ND2024004",
      department: "Engineering",
      year: "Year 1",
      phone: "+256 700 444 444",
      hostel: "Block A - Room 102",
      gpa: 3.2,
      status: "active",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 5,
      name: "Sarah Nakirya",
      email: "sarah.nakirya@ndejje.ac.ug",
      studentId: "ND2024005",
      department: "Education",
      year: "Year 3",
      phone: "+256 700 555 555",
      hostel: "Block B - Room 203",
      gpa: 3.7,
      status: "active",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 6,
      name: "Peter Kato",
      email: "peter.kato@ndejje.ac.ug",
      studentId: "ND2024006",
      department: "Medicine",
      year: "Year 2",
      phone: "+256 700 666 666",
      hostel: "Block C - Room 105",
      gpa: 3.6,
      status: "active",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  const departments = [
    "Computer Science",
    "Business Administration",
    "Mass Communication",
    "Engineering",
    "Education",
    "Medicine",
  ]
  const years = ["Year 1", "Year 2", "Year 3", "Year 4"]

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || student.department === selectedDepartment
    const matchesYear = selectedYear === "all" || student.year === selectedYear

    return matchesSearch && matchesDepartment && matchesYear
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "suspended":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6">
      <div className="border-2 border-purple-300 rounded-xl p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Student Directory</h1>
            <p className="text-gray-600">Manage and view all registered students</p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Badge variant="outline" className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{filteredStudents.length} Students</span>
            </Badge>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <Button className="bg-purple-700 hover:bg-purple-800">
            <Filter className="w-4 h-4 mr-2" />
            Export List
          </Button>
        </div>

        {/* Students Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start space-x-4">
                  <img
                    src={student.avatar || "/placeholder.svg"}
                    alt={student.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-purple-200"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-lg text-gray-900">{student.name}</CardTitle>
                    <p className="text-purple-700 font-medium">{student.studentId}</p>
                    <Badge className={getStatusColor(student.status)} variant="secondary">
                      {student.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <BookOpen className="w-4 h-4" />
                    <span>{student.department}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <GraduationCap className="w-4 h-4" />
                    <span>
                      {student.year} • GPA: {student.gpa}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{student.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{student.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{student.hostel}</span>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button size="sm" className="bg-purple-700 hover:bg-purple-800">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                  <Button size="sm" variant="outline">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Statistics */}
        <div className="mt-8 grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-700">{students.length}</div>
              <div className="text-sm text-gray-600">Total Students</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-700">
                {students.filter((s) => s.status === "active").length}
              </div>
              <div className="text-sm text-gray-600">Active Students</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-700">{departments.length}</div>
              <div className="text-sm text-gray-600">Departments</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-700">3.6</div>
              <div className="text-sm text-gray-600">Average GPA</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
