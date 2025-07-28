"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Center, Spinner } from "@chakra-ui/react";
import { useUser } from "@/contexts/user-context";

interface AuthWrapperProps {
  children: ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const { user, isLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const isLoginRoute = pathname === "/login";

  useEffect(() => {
    if (!isLoading) {
      if (!user && !isLoginRoute) {
        router.replace("/login");
      } else if (user && isLoginRoute) {
        router.replace("/");
      }
    }
  }, [user, isLoading, isLoginRoute, router]);

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!user && !isLoginRoute) {
    return null;
  }

  return <>{children}</>;
}
