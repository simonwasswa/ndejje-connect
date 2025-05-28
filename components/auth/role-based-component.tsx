"use client"

import type React from "react"

import { useAuth } from "@/hooks/use-auth"

interface RoleBasedComponentProps {
  children: React.ReactNode
  allowedRoles?: ("student" | "admin")[]
  requiredPermission?: string
  fallback?: React.ReactNode
}

export function RoleBasedComponent({
  children,
  allowedRoles,
  requiredPermission,
  fallback = null,
}: RoleBasedComponentProps) {
  const { user, hasPermission } = useAuth()

  if (!user) return fallback

  // Check role-based access
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return fallback
  }

  // Check permission-based access
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return fallback
  }

  return <>{children}</>
}
