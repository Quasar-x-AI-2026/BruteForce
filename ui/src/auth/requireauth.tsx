import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../auth/authcontext"

export default function RequireAuth({
  children
}: {
  children: ReactNode
}) {
  const { user, loading } = useAuth()

 if (loading) {
  return <div>Checking session…</div>
}

if (!user) {
  return <Navigate to="/login" />
}

return children


  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
