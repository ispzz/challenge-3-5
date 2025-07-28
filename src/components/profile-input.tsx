"use client";

import { UserFormErrors } from "@/types/user";
import { Field, Input, Stack } from "@chakra-ui/react";

interface ProfileInputProps {
  username: string;
  jobTitle: string;
  onUsernameChange: (value: string) => void;
  onJobTitleChange: (value: string) => void;
  errors: UserFormErrors;
}

export default function ProfileInput({ username, jobTitle, onUsernameChange, onJobTitleChange, errors }: ProfileInputProps) {
  return (
    <Stack gap={4}>
      <Field.Root invalid={!!errors.username}>
        <Field.Label>Username</Field.Label>
        <Input value={username} onChange={(e) => onUsernameChange(e.target.value)} placeholder="Enter your username" fontSize="md" />
        {errors.username && <Field.ErrorText>{errors.username}</Field.ErrorText>}
      </Field.Root>

      <Field.Root invalid={!!errors.jobTitle}>
        <Field.Label>Job Title</Field.Label>
        <Input value={jobTitle} onChange={(e) => onJobTitleChange(e.target.value)} placeholder="Enter your job title" fontSize="md" />
        {errors.jobTitle && <Field.ErrorText>{errors.jobTitle}</Field.ErrorText>}
      </Field.Root>
    </Stack>
  );
}
