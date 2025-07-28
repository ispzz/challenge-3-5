"use client";

import { Container, Box, Heading, Button, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/user-context";
import ProfileInput from "@/components/profile-input";
import { handleUserFormSubmit } from "@/utils/user-form-helpers";
import { UserFormErrors } from "@/types/user";

export default function ProfilePage() {
  const { user, updateUser } = useUser();
  const router = useRouter();
  const [username, setUsername] = useState<string>(user?.username || "");
  const [jobTitle, setJobTitle] = useState<string>(user?.jobTitle || "");
  const [errors, setErrors] = useState<UserFormErrors>({ username: "", jobTitle: "" });

  const handleSubmit = (e: React.FormEvent) => {
    handleUserFormSubmit(e, username, jobTitle, updateUser, router, setErrors);
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <Container maxW="md" py={8}>
      <Box p={6} borderRadius="lg" borderWidth="1px">
        <Heading textAlign="center" mb={6}>
          Edit Profile
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack gap={4}>
            <ProfileInput username={username} jobTitle={jobTitle} onUsernameChange={setUsername} onJobTitleChange={setJobTitle} errors={errors} />

            <Stack direction="row" gap={4} mt={4}>
              <Button type="submit" flex={1}>
                Save Changes
              </Button>
              <Button variant="outline" onClick={handleCancel} flex={1}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}
