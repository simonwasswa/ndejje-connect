"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: number
  name: string
  email: string
  role: "student" | "admin"
  studentId: string
  department: string
  year: string
  avatar: string
  permissions: string[]
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("ndejje_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem("ndejje_user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("ndejje_user")
    // Navigate to login page after logout
    router.push("/login")
  }

  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) || false
  }

  const isAdmin = (): boolean => {
    return user?.role === "admin"
  }

  const isStudent = (): boolean => {
    return user?.role === "student"
  }

  return {
    user,
    isLoading,
    login,
    logout,
    hasPermission,
    isAdmin,
    isStudent,
    isAuthenticated: !!user,
  }
}
