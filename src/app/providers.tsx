"use client";

import { UserProvider } from "@/contexts/user-context";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider forcedTheme="dark" disableTransitionOnChange>
        <UserProvider>{children}</UserProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
}
