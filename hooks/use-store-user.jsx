"use client";

import { useUser } from "@clerk/nextjs";
import { useConvexAuth, useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../convex/_generated/api";

export function useStoreUser() {
  const { isLoading, isAuthenticated } = useConvexAuth();

  const { user, isLoaded } = useUser();

  const [userId, setUserId] = useState(null);

  const storeUser = useMutation(api.users.store);

  useEffect(() => {
    // wait until clerk loads
    if (!isLoaded) return;

    // if user not signed in
    if (!isAuthenticated || !user) {
      setUserId(null);
      return;
    }

    async function createUser() {
      try {
        const id = await storeUser();

        setUserId(id);

        console.log("✅ User stored in Convex");
      } catch (error) {
        console.error("❌ Error storing user:", error);
      }
    }

    createUser();

    return () => setUserId(null);
  }, [isAuthenticated, isLoaded, user, storeUser]);

  return {
    isLoading: isLoading || (isAuthenticated && userId === null),
    isAuthenticated: isAuthenticated && userId !== null,
  };
}