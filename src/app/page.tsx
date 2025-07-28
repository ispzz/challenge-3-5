'use client'

import { useUser } from '@/contexts/user-context'
import { Container, Heading, Text, Box, Button, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const { user, logout } = useUser()
  const router = useRouter()

  return (
    <Container maxW="container.md" py={8}>
      <Stack gap={6}>
        <Box p={6} borderRadius="lg" borderWidth="1px">
          <Heading size="md" mb={4}>Profile Information</Heading>
          <Text><strong>Username:</strong> {user?.username}</Text>
          <Text><strong>Job Title:</strong> {user?.jobTitle}</Text>
          
          <Stack direction="row" mt={4} gap={4}>
            <Button 
              colorPalette="blue" 
              onClick={() => router.push('/profile')}
            >
              Edit Profile
            </Button>
            <Button 
              variant="outline" 
              onClick={logout}
            >
              Logout
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
}