"use client";

import { Box, Container, Heading, Button, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/user-context";
import ProfileInput from "@/components/profile-input";
import { handleUserFormSubmit } from "@/utils/user-form-helpers";
import { UserFormErrors } from "@/types/user";

export default function LoginPage() {
  const { login } = useUser();
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [errors, setErrors] = useState<UserFormErrors>({ username: "", jobTitle: "" });

  const handleSubmit = (e: React.FormEvent) => {
    handleUserFormSubmit(e, username, jobTitle, login, router, setErrors);
  };

  return (
    <Container maxW="md" centerContent display="flex" alignItems="center" justifyContent="center" height="90vh">
      <Box w="100%" p={8} borderRadius="lg" borderWidth="1px">
        <Heading textAlign="center" mb={6}>
          Leonardo AI Challenge
        </Heading>
        <Text textAlign="center" mb={8} color="fg.muted">
          Please enter your information to continue
        </Text>

        <form onSubmit={handleSubmit}>
          <Stack gap={4}>
            <ProfileInput username={username} jobTitle={jobTitle} onUsernameChange={setUsername} onJobTitleChange={setJobTitle} errors={errors} />

            <Button type="submit" w="full" mt={4}>
              Continue
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}
