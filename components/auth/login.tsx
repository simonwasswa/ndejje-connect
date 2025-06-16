"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GraduationCap, Eye, EyeOff, AlertCircle } from "lucide-react"

interface LoginProps {
  onLogin?: (user: any) => void
}

export function Login({ onLogin }: LoginProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Mock users for demonstration
  const mockUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "student@ndejje.ac.ug",
      password: "student123",
      role: "student",
      studentId: "ND2024001",
      department: "Computer Science",
      year: "Year 3",
      avatar: "/placeholder.svg?height=40&width=40",
      permissions: ["view_announcements", "view_events", "submit_inquiry", "view_guild_members"],
    },
    {
      id: 2,
      name: "Admin User",
      email: "admin@ndejje.ac.ug",
      password: "admin123",
      role: "admin",
      studentId: "ADMIN001",
      department: "Administration",
      year: "Staff",
      avatar: "/placeholder.svg?height=40&width=40",
      permissions: [
        "view_announcements",
        "create_announcements",
        "edit_announcements",
        "delete_announcements",
        "view_events",
        "create_events",
        "edit_events",
        "delete_events",
        "view_inquiries",
        "respond_inquiries",
        "manage_inquiries",
        "view_guild_members",
        "manage_guild_members",
        "edit_guild_members",
        "delete_guild_members",
        "view_students",
        "manage_students",
        "edit_students",
        "delete_students",
        "view_resources",
        "manage_resources",
        "edit_resources",
        "delete_resources",
        "admin_dashboard",
        "system_settings",
        "manage_users",
        "edit_system",
        "full_access",
      ],
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const user = mockUsers.find((u) => u.email === formData.email && u.password === formData.password)

      if (user) {
        // Remove password from user object before storing
        const { password, ...userWithoutPassword } = user
        onLogin?.(userWithoutPassword)
      } else {
        setError("Invalid email or password")
      }
    } catch (error) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = (userType: "student" | "admin") => {
    const demoUser = mockUsers.find((u) => u.role === userType)
    if (demoUser) {
      const { password, ...userWithoutPassword } = demoUser
      onLogin?.(userWithoutPassword)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-purple-700 rounded-full flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Ndejje Connect</CardTitle>
          <p className="text-gray-600">Sign in to your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@ndejje.ac.ug"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter your password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-800" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Demo Login Buttons */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center mb-4">Demo Accounts:</p>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full" onClick={() => handleDemoLogin("student")}>
                Login as Student
              </Button>
              <Button variant="outline" size="sm" className="w-full" onClick={() => handleDemoLogin("admin")}>
                Login as Admin
              </Button>
            </div>
          </div>

          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-purple-600 hover:text-purple-700">
              Forgot your password?
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
