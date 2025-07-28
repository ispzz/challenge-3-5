"use client";

import { Box, Container, Stack, Heading, Button, Text, IconButton, Drawer, Avatar } from "@chakra-ui/react";
import { useRouter, usePathname } from "next/navigation";
import { LuMenu, LuX } from "react-icons/lu";
import { useState } from "react";
import { useUser } from "@/contexts/user-context";

export function Header() {
  const { user, logout, isLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const navItems = [
    { label: "Home", path: "/", active: pathname === "/" },
    { label: "Information Page", path: "/information", active: pathname.startsWith("/information") }
  ];

  const headingName = "Leonardo AI Challenge";

  // only show header if user is logged in and not loading
  if (isLoading || !user) {
    return null;
  }

  return (
    <Box as="header" pos="sticky" top={0} zIndex="sticky" bg="bg.subtle" borderBottomWidth="1px" py={4}>
      <Container maxW="container.lg">
        {/* Desktop Header */}
        <Stack direction="row" justify="space-between" align="center" display={{ base: "none", md: "flex" }}>
          <Heading size="md">{headingName}</Heading>

          <Stack direction="row" gap={4} align="center">
            {navItems.map((item) => (
              <Button key={item.path} variant={item.active ? "solid" : "ghost"} onClick={() => router.push(item.path)} size="sm">
                {item.label}
              </Button>
            ))}
            {user && (
              <Avatar.Root size="lg" shape="rounded" colorPalette="purple">
                <Avatar.Fallback name={user?.username} />
              </Avatar.Root>
            )}
            <Button variant="surface" onClick={logout}>
              Logout
            </Button>
          </Stack>
        </Stack>

        {/* Mobile Header */}
        <Stack direction="row" justify="space-between" align="center" display={{ base: "flex", md: "none" }}>
          <Heading size="sm">{headingName}</Heading>
          <IconButton aria-label="Open menu" onClick={() => setIsDrawerOpen(true)} variant="ghost" size="sm">
            <LuMenu />
          </IconButton>
        </Stack>
      </Container>

      {/* Mobile Menu */}
      <Drawer.Root open={isDrawerOpen} onOpenChange={(details) => setIsDrawerOpen(details.open)} placement="end">
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Stack direction="row" justify="space-between" align="center">
                <Heading size="sm">Menu</Heading>
                <Drawer.CloseTrigger asChild>
                  <IconButton aria-label="Close menu" variant="ghost" size="sm">
                    <LuX />
                  </IconButton>
                </Drawer.CloseTrigger>
              </Stack>
            </Drawer.Header>
            <Drawer.Body>
              <Stack gap={2}>
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    variant={item.active ? "solid" : "ghost"}
                    onClick={() => {
                      router.push(item.path);
                      setIsDrawerOpen(false);
                    }}
                    w="full"
                    justifyContent="start"
                  >
                    {item.label}
                  </Button>
                ))}
                {user && (
                  <Box p={3} borderTopWidth="1px" mt={2}>
                    <Text fontSize="sm" color="fg.muted">
                      Logged in as: <strong>{user.username}</strong>
                    </Text>
                  </Box>
                )}
                <Button variant="surface" onClick={logout}>
                  Logout
                </Button>
              </Stack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </Box>
  );
}
