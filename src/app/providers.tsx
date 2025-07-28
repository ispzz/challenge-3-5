"use client";

import { AuthWrapper } from "@/components/auth-wrapper";
import { UserProvider } from "@/contexts/user-context";
import { apolloClient } from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ApolloProvider client={apolloClient}>
        <UserProvider>
          <AuthWrapper>{children}</AuthWrapper>
        </UserProvider>
      </ApolloProvider>
    </ChakraProvider>
  );
}
