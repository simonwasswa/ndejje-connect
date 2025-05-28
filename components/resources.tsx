"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Download, FileText, BookOpen, Video, Link, Upload, Filter } from "lucide-react"

export function Resources() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const resources = [
    {
      id: 1,
      title: "Student Handbook 2024",
      description: "Complete guide to university policies, procedures, and student life",
      category: "handbook",
      type: "pdf",
      size: "2.5 MB",
      downloads: 1250,
      uploadDate: "2024-01-15",
      url: "#",
      featured: true,
    },
    {
      id: 2,
      title: "Academic Calendar",
      description: "Important dates for the 2024 academic year including exams and holidays",
      category: "academic",
      type: "pdf",
      size: "1.2 MB",
      downloads: 890,
      uploadDate: "2024-01-10",
      url: "#",
      featured: true,
    },
    {
      id: 3,
      title: "Guild Constitution",
      description: "Official guild constitution and bylaws",
      category: "governance",
      type: "pdf",
      size: "800 KB",
      downloads: 456,
      uploadDate: "2024-02-01",
      url: "#",
      featured: false,
    },
    {
      id: 4,
      title: "Mental Health Resources",
      description: "Comprehensive guide to mental health support services",
      category: "wellness",
      type: "pdf",
      size: "1.8 MB",
      downloads: 678,
      uploadDate: "2024-02-15",
      url: "#",
      featured: true,
    },
    {
      id: 5,
      title: "Career Services Guide",
      description: "How to access career counseling, job placement, and internship opportunities",
      category: "career",
      type: "pdf",
      size: "2.1 MB",
      downloads: 534,
      uploadDate: "2024-02-20",
      url: "#",
      featured: false,
    },
    {
      id: 6,
      title: "Financial Aid Application",
      description: "Step-by-step guide to applying for financial assistance",
      category: "financial",
      type: "pdf",
      size: "1.5 MB",
      downloads: 789,
      uploadDate: "2024-03-01",
      url: "#",
      featured: false,
    },
    {
      id: 7,
      title: "Campus Safety Guidelines",
      description: "Important safety information and emergency procedures",
      category: "safety",
      type: "pdf",
      size: "1.1 MB",
      downloads: 345,
      uploadDate: "2024-03-05",
      url: "#",
      featured: false,
    },
    {
      id: 8,
      title: "Study Abroad Programs",
      description: "Information about international exchange opportunities",
      category: "academic",
      type: "pdf",
      size: "3.2 MB",
      downloads: 234,
      uploadDate: "2024-03-10",
      url: "#",
      featured: false,
    },
  ]

  const categories = [
    { id: "all", label: "All Resources", count: resources.length },
    { id: "handbook", label: "Handbooks", count: resources.filter((r) => r.category === "handbook").length },
    { id: "academic", label: "Academic", count: resources.filter((r) => r.category === "academic").length },
    { id: "governance", label: "Governance", count: resources.filter((r) => r.category === "governance").length },
    { id: "wellness", label: "Wellness", count: resources.filter((r) => r.category === "wellness").length },
    { id: "career", label: "Career", count: resources.filter((r) => r.category === "career").length },
    { id: "financial", label: "Financial", count: resources.filter((r) => r.category === "financial").length },
    { id: "safety", label: "Safety", count: resources.filter((r) => r.category === "safety").length },
  ]

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const featuredResources = resources.filter((r) => r.featured)

  const getCategoryColor = (category: string) => {
    const colors = {
      handbook: "bg-purple-100 text-purple-800",
      academic: "bg-blue-100 text-blue-800",
      governance: "bg-green-100 text-green-800",
      wellness: "bg-pink-100 text-pink-800",
      career: "bg-yellow-100 text-yellow-800",
      financial: "bg-red-100 text-red-800",
      safety: "bg-orange-100 text-orange-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-600" />
      case "video":
        return <Video className="w-5 h-5 text-blue-600" />
      case "link":
        return <Link className="w-5 h-5 text-green-600" />
      default:
        return <FileText className="w-5 h-5 text-gray-600" />
    }
  }

  return (
    <div className="p-6">
      <div className="border-2 border-purple-300 rounded-xl p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Student Resources</h1>
            <p className="text-gray-600">Access important documents, guides, and information</p>
          </div>
          <Button className="bg-purple-700 hover:bg-purple-800 mt-4 md:mt-0">
            <Upload className="w-4 h-4 mr-2" />
            Upload Resource
          </Button>
        </div>

        {/* Featured Resources */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    {getFileIcon(resource.type)}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{resource.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{resource.size}</p>
                      <Badge className={getCategoryColor(resource.category)} variant="secondary">
                        {resource.category}
                      </Badge>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-3 bg-purple-700 hover:bg-purple-800">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label} ({category.count})
              </option>
            ))}
          </select>

          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? "bg-purple-700 hover:bg-purple-800" : ""}
            >
              {category.label} ({category.count})
            </Button>
          ))}
        </div>

        {/* Resources List */}
        <div className="space-y-4">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {getFileIcon(resource.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{resource.title}</h3>
                        {resource.featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                      </div>
                      <p className="text-gray-600 mb-3">{resource.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <Badge className={getCategoryColor(resource.category)} variant="secondary">
                          {resource.category}
                        </Badge>
                        <span>{resource.size}</span>
                        <span>{resource.downloads} downloads</span>
                        <span>Updated {resource.uploadDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button size="sm" className="bg-purple-700 hover:bg-purple-800">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-8 p-6 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-900 mb-4">Quick Links</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="#" className="flex items-center space-x-2 text-purple-700 hover:text-purple-800">
              <Link className="w-4 h-4" />
              <span>University Website</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-purple-700 hover:text-purple-800">
              <Link className="w-4 h-4" />
              <span>Student Portal</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-purple-700 hover:text-purple-800">
              <Link className="w-4 h-4" />
              <span>Library System</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-purple-700 hover:text-purple-800">
              <Link className="w-4 h-4" />
              <span>Course Registration</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-purple-700 hover:text-purple-800">
              <Link className="w-4 h-4" />
              <span>Fee Payment</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-purple-700 hover:text-purple-800">
              <Link className="w-4 h-4" />
              <span>Academic Records</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
