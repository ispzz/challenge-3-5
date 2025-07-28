export interface UserFormData {
  username: string;
  jobTitle: string;
}

export interface UserFormErrors {
  username: string;
  jobTitle: string;
}

export const validateUserForm = (username: string, jobTitle: string) => {
  const newErrors = { username: "", jobTitle: "" };

  if (!username.trim()) {
    newErrors.username = "Username is required";
  }

  if (!jobTitle.trim()) {
    newErrors.jobTitle = "Job title is required";
  }

  return {
    errors: newErrors,
    isValid: !newErrors.username && !newErrors.jobTitle
  };
};

export const handleUserFormSubmit = (
  e: React.FormEvent,
  username: string,
  jobTitle: string,
  updateUser: (data: UserFormData) => void,
  router: { push: (path: string) => void },
  setErrors: (errors: UserFormErrors) => void
) => {
  e.preventDefault();

  const { errors, isValid } = validateUserForm(username, jobTitle);
  setErrors(errors);

  if (isValid) {
    updateUser({
      username: username.trim(),
      jobTitle: jobTitle.trim()
    });
    router.push("/");
  }
};
