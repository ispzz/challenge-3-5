'use client'

import { ReactNode, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Center, Spinner } from '@chakra-ui/react'
import { useUser } from '@/contexts/user-context'

interface AuthWrapperProps {
  children: ReactNode
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const { user, isLoading } = useUser()
  const pathname = usePathname()
  const router = useRouter()

  const isPublicRoute = pathname === '/login'

  useEffect(() => {
    if (!isLoading) {
      if (!user && !isPublicRoute) {
        router.replace('/login')
      } else if (user && isPublicRoute) {
        router.replace('/')
      }
    }
  }, [user, isLoading, isPublicRoute, router])

  // Show loading state
  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    )
  }

  // Don't render protected content if not authenticated
  if (!user && !isPublicRoute) {
    return null
  }

  return <>{children}</>
}