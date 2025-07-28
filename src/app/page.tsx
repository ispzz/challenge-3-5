"use client";

import { useUser } from "@/contexts/user-context";
import { Container, Heading, Text, Box, Button, Stack, Grid, Avatar, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <Container py={8}>
      <Grid templateColumns={{ base: "1fr", md: "300px 1fr" }} gap={6}>
        <Box p={6} borderRadius="lg" borderWidth="1px">
          <Flex align="center" mb={6}>
            <Avatar.Root size="lg" mr={4} shape="rounded" colorPalette="purple">
              <Avatar.Fallback name={user?.username} />
            </Avatar.Root>
            <Box>
              <Text fontWeight="bold" fontSize="md">
                {user?.username}
              </Text>
              <Text color="gray.500">{user?.jobTitle}</Text>
            </Box>
          </Flex>

          <Stack direction="row" mt={4} gap={4}>
            <Button onClick={() => router.push("/profile")}>Edit Profile</Button>
          </Stack>
        </Box>

        <Box p={6} borderRadius="lg" borderWidth="1px">
          <Heading size="md" mb={4}>
            Explore Anime
          </Heading>
          <Text color="fg.muted" mb={4}>
            Browse through a collection of popular anime with detailed information and images.
          </Text>
          <Button onClick={() => router.push("/information")}>Go to Anime Page</Button>
        </Box>
      </Grid>
    </Container>
  );
}
