"use client";

import { ConvexReactClient, AuthLoading, Authenticated, Unauthenticated } from "convex/react";
import { ReactNode } from "react";
import { ConvexProviderWithClerk } from "convex/react-clerk"
import {
  ClerkProvider,
  useAuth,
  SignIn
} from '@clerk/clerk-react'
import FullScreenLoader from "./fullscreen-loader";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk
        useAuth={useAuth}
        client={convex}
      >
        <Authenticated>
          {children}
        </Authenticated>
        <Unauthenticated>
          <div className="flex flex-col items-center justify-center min-h-screen">
            <SignIn />
          </div>
        </Unauthenticated>
        <AuthLoading>
          <FullScreenLoader label="Loading auth..." />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}