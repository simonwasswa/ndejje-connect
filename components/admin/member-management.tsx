"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Trash2, Search, Filter, Users, UserPlus, Mail, Phone, MapPin, Save, X } from "lucide-react"
import { ImageUpload } from "@/components/ui/image-upload"

export function MemberManagement() {
  const [members, setMembers] = useState([
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
      status: "active",
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
      status: "active",
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
      status: "active",
    },
  ])

  const [isAddingMember, setIsAddingMember] = useState(false)
  const [editingMember, setEditingMember] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [newMember, setNewMember] = useState({
    name: "",
    position: "",
    department: "",
    year: "",
    email: "",
    phone: "",
    office: "",
    responsibilities: "",
    status: "active",
    bio: "",
    image: "/placeholder.svg?height=100&width=100",
  })

  const positions = [
    "Guild President",
    "Vice President",
    "Secretary General",
    "Treasurer",
    "Sports Minister",
    "Academic Minister",
    "Social Minister",
    "Welfare Minister",
  ]

  const departments = [
    "Computer Science",
    "Business Administration",
    "Mass Communication",
    "Engineering",
    "Education",
    "Medicine",
  ]

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddMember = () => {
    if (newMember.name && newMember.position && newMember.email) {
      const member = {
        id: Date.now(),
        ...newMember,
        responsibilities: newMember.responsibilities.split(",").map((r) => r.trim()),
        image: "/placeholder.svg?height=100&width=100",
      }
      setMembers([...members, member])
      setNewMember({
        name: "",
        position: "",
        department: "",
        year: "",
        email: "",
        phone: "",
        office: "",
        responsibilities: "",
        status: "active",
        bio: "",
        image: "/placeholder.svg?height=100&width=100",
      })
      setIsAddingMember(false)
    }
  }

  const handleDeleteMember = (id: number) => {
    if (confirm("Are you sure you want to remove this member?")) {
      setMembers(members.filter((member) => member.id !== id))
    }
  }

  const handleEditMember = (id: number) => {
    setEditingMember(id)
  }

  const handleSaveEdit = (id: number, updatedData: any) => {
    setMembers(
      members.map((member) =>
        member.id === id
          ? {
              ...member,
              ...updatedData,
              responsibilities: updatedData.responsibilities.split(",").map((r: string) => r.trim()),
            }
          : member,
      ),
    )
    setEditingMember(null)
  }

  return (
    <div className="p-4 md:p-6">
      <div className="border-2 border-purple-300 rounded-xl p-4 md:p-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">Member Management</h1>
            <p className="text-gray-600">Add, edit, and manage guild council members</p>
          </div>
          <Button
            onClick={() => setIsAddingMember(true)}
            className="bg-purple-700 hover:bg-purple-800 w-full lg:w-auto"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add New Member
          </Button>
        </div>

        <Tabs defaultValue="members" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="members">Guild Members</TabsTrigger>
            <TabsTrigger value="positions">Manage Positions</TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="w-full md:w-auto">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Add Member Form */}
            {isAddingMember && (
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <UserPlus className="w-5 h-5 mr-2 text-green-600" />
                      Add New Member
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => setIsAddingMember(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={newMember.name}
                        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="position">Position</Label>
                      <select
                        value={newMember.position}
                        onChange={(e) => setNewMember({ ...newMember, position: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Select position</option>
                        {positions.map((pos) => (
                          <option key={pos} value={pos}>
                            {pos}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <select
                        value={newMember.department}
                        onChange={(e) => setNewMember({ ...newMember, department: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Select department</option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="year">Academic Year</Label>
                      <select
                        value={newMember.year}
                        onChange={(e) => setNewMember({ ...newMember, year: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Select year</option>
                        <option value="Year 1">Year 1</option>
                        <option value="Year 2">Year 2</option>
                        <option value="Year 3">Year 3</option>
                        <option value="Year 4">Year 4</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newMember.email}
                        onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                        placeholder="email@ndejje.ac.ug"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={newMember.phone}
                        onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                        placeholder="+256 700 000 000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="office">Office Location</Label>
                      <Input
                        id="office"
                        value={newMember.office}
                        onChange={(e) => setNewMember({ ...newMember, office: e.target.value })}
                        placeholder="Guild Office - Room 101"
                      />
                    </div>
                    <div>
                      <Label htmlFor="responsibilities">Responsibilities (comma-separated)</Label>
                      <Input
                        id="responsibilities"
                        value={newMember.responsibilities}
                        onChange={(e) => setNewMember({ ...newMember, responsibilities: e.target.value })}
                        placeholder="Student Welfare, Academic Affairs"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <ImageUpload
                      currentImage={newMember.image}
                      onImageChange={(imageUrl) => setNewMember({ ...newMember, image: imageUrl })}
                      label="Member Photo"
                      aspectRatio="square"
                      className="mt-4"
                    />
                  </div>
                  <div className="flex flex-col md:flex-row gap-2 mt-4">
                    <Button onClick={handleAddMember} className="bg-green-700 hover:bg-green-800">
                      <Save className="w-4 h-4 mr-2" />
                      Add Member
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddingMember(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Members Grid */}
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {filteredMembers.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  isEditing={editingMember === member.id}
                  onEdit={() => handleEditMember(member.id)}
                  onDelete={() => handleDeleteMember(member.id)}
                  onSave={(data) => handleSaveEdit(member.id, data)}
                  onCancel={() => setEditingMember(null)}
                  positions={positions}
                  departments={departments}
                />
              ))}
            </div>

            {filteredMembers.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
                <p className="text-gray-600">Try adjusting your search criteria</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="positions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Positions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {positions.map((position, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-medium">{position}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {members.filter((m) => m.position === position).length} assigned
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

interface MemberCardProps {
  member: any
  isEditing: boolean
  onEdit: () => void
  onDelete: () => void
  onSave: (data: any) => void
  onCancel: () => void
  positions: string[]
  departments: string[]
}

function MemberCard({
  member,
  isEditing,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  positions,
  departments,
}: MemberCardProps) {
  const [editData, setEditData] = useState({
    name: member.name,
    position: member.position,
    department: member.department,
    year: member.year,
    email: member.email,
    phone: member.phone,
    office: member.office,
    responsibilities: member.responsibilities.join(", "),
    bio: member.bio || "",
    status: member.status,
    image: member.image || "",
  })

  if (isEditing) {
    return (
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Edit Member</span>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label>Name</Label>
            <Input
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              className="text-sm"
            />
          </div>
          <div>
            <Label>Position</Label>
            <select
              value={editData.position}
              onChange={(e) => setEditData({ ...editData, position: e.target.value })}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {positions.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Email</Label>
            <Input
              value={editData.email}
              onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              className="text-sm"
            />
          </div>
          <div>
            <Label>Phone</Label>
            <Input
              value={editData.phone}
              onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
              className="text-sm"
            />
          </div>
          <div>
            <Label>Photo</Label>
            <ImageUpload
              currentImage={editData.image}
              onImageChange={(imageUrl) => setEditData({ ...editData, image: imageUrl })}
              label=""
              aspectRatio="square"
              className="mt-1"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button size="sm" onClick={() => onSave(editData)} className="bg-blue-700 hover:bg-blue-800">
              <Save className="w-3 h-3 mr-1" />
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start space-x-3">
          <img
            src={member.image || "/placeholder.svg"}
            alt={member.name}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-purple-200"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate">{member.name}</h3>
            <p className="text-purple-700 font-semibold text-sm">{member.position}</p>
            <p className="text-gray-600 text-sm">
              {member.department} • {member.year}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Mail className="w-3 h-3" />
            <span className="truncate">{member.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Phone className="w-3 h-3" />
            <span>{member.phone}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{member.office}</span>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-gray-700 mb-1">Responsibilities:</p>
          <div className="flex flex-wrap gap-1">
            {member.responsibilities.slice(0, 2).map((resp: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {resp}
              </Badge>
            ))}
            {member.responsibilities.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{member.responsibilities.length - 2}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <Button size="sm" variant="outline" onClick={onEdit} className="flex-1">
            <Edit className="w-3 h-3 mr-1" />
            Edit
          </Button>
          <Button size="sm" variant="outline" onClick={onDelete} className="text-red-600 hover:text-red-700 flex-1">
            <Trash2 className="w-3 h-3 mr-1" />
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
