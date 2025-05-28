"use client"

import type React from "react"

import { useAuth } from "@/hooks/use-auth"
import { AlertCircle, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredPermission?: string
  requiredRole?: "student" | "admin"
  fallback?: React.ReactNode
}

export function ProtectedRoute({ children, requiredPermission, requiredRole, fallback }: ProtectedRouteProps) {
  const { user, hasPermission } = useAuth()

  if (!user) {
    return null // This should be handled by the main app
  }

  // Check role-based access
  if (requiredRole && user.role !== requiredRole) {
    return (
      fallback || (
        <div className="p-6">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6 text-center">
              <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">Access Denied</h3>
              <p className="text-red-600">
                You don't have permission to access this section.
                {requiredRole === "admin" && " This area is restricted to administrators only."}
                {requiredRole === "student" && " This area is restricted to students only."}
              </p>
            </CardContent>
          </Card>
        </div>
      )
    )
  }

  // Check permission-based access
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      fallback || (
        <div className="p-6">
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-6 text-center">
              <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Insufficient Permissions</h3>
              <p className="text-yellow-600">You don't have the required permissions to perform this action.</p>
            </CardContent>
          </Card>
        </div>
      )
    )
  }

  return <>{children}</>
}
