"use client";

import { Box, Container, Text } from "@chakra-ui/react";

export function Footer() {
  return (
    <Box as="footer" py={4} mt="auto">
      <Container maxW="container.lg">
        <Text textAlign="center">v3.5</Text>
      </Container>
    </Box>
  );
}
