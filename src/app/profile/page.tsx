"use client";

import { Container, Box, Heading, Input, Button, Stack, Text, IconButton, Field } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/user-context";
import ProfileInput from "@/components/profile-input";
import { UserFormErrors, handleUserFormSubmit } from "@/utils/user-form-helpers";

export default function ProfilePage() {
  const { user, updateUser } = useUser();
  const router = useRouter();
  const [username, setUsername] = useState(user?.username || "");
  const [jobTitle, setJobTitle] = useState(user?.jobTitle || "");
  const [errors, setErrors] = useState<UserFormErrors>({ username: "", jobTitle: "" });

  const handleSubmit = (e: React.FormEvent) => {
    handleUserFormSubmit(e, username, jobTitle, updateUser, router, setErrors);
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <Container maxW="md" py={8}>
      <Stack gap={6}>
        <Stack direction="row" align="center">
          <IconButton aria-label="Back" onClick={handleCancel} variant="ghost"></IconButton>
          <Heading>Edit Profile</Heading>
        </Stack>

        <Box p={6} borderRadius="lg" borderWidth="1px">
          <form onSubmit={handleSubmit}>
            <Stack gap={4}>
              <ProfileInput username={username} jobTitle={jobTitle} onUsernameChange={setUsername} onJobTitleChange={setJobTitle} errors={errors} />

              <Stack direction="row" gap={4} mt={4}>
                <Button type="submit" colorPalette="blue" flex={1}>
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleCancel} flex={1}>
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
}
