"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Building,
  Crown,
  Plus,
  Ticket,
} from "lucide-react";

import {
  SignInButton,
  UserButton,
  useAuth,
} from "@clerk/nextjs";

import { BarLoader } from "react-spinners";

import { useStoreUser } from "@/hooks/use-store-user";
import { useOnboarding } from "@/hooks/use-onboarding";

import OnboardingModal from "./onboarding-modal";
import SearchLocationBar from "./search-location-bar";
import UpgradeModal from "./upgrade-modal";

import { Button } from "@/components/ui/button";
import { Badge } from "./ui/badge";

export default function Header() {
  const [showUpgradeModal, setShowUpgradeModal] =
    useState(false);

  const { isLoading } = useStoreUser();

  const {
    showOnboarding,
    handleOnboardingComplete,
    handleOnboardingSkip,
  } = useOnboarding();

  const { has, userId } = useAuth();

  const hasPro = has?.({ plan: "pro" });

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-xl z-20 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/spott.png"
              alt="Spott logo"
              width={500}
              height={500}
              className="w-full h-11"
              priority
            />

            {hasPro && (
              <Badge className="bg-linear-to-r from-pink-500 to-orange-500 gap-1 text-white ml-3">
                <Crown className="w-3 h-3" />
                Pro
              </Badge>
            )}
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 justify-center">
            <SearchLocationBar />
          </div>

          {/* Right Side */}
          <div className="flex items-center">

            {!hasPro && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setShowUpgradeModal(true)
                }
              >
                Pricing
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              asChild
              className="mr-2"
            >
              <Link href="/explore">
                Explore
              </Link>
            </Button>

            {userId ? (
              <>
                {/* Create Event */}
                <Button
                  size="sm"
                  asChild
                  className="flex gap-2 mr-4"
                >
                  <Link href="/create-event">
                    <Plus className="w-4 h-4" />

                    <span className="hidden sm:inline">
                      Create Event
                    </span>
                  </Link>
                </Button>

                {/* Profile */}
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10",
                    },
                  }}
                >
                  <UserButton.MenuItems>
                    <UserButton.Link
                      label="My Tickets"
                      labelIcon={
                        <Ticket size={16} />
                      }
                      href="/my-tickets"
                    />

                    <UserButton.Link
                      label="My Events"
                      labelIcon={
                        <Building size={16} />
                      }
                      href="/my-events"
                    />

                    <UserButton.Action
                      label="manageAccount"
                    />

                    <UserButton.Action
                      label="signOut"
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </>
            ) : (
              <SignInButton mode="modal">
                <Button size="sm">
                  Sign In
                </Button>
              </SignInButton>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden border-t px-3 py-3">
          <SearchLocationBar />
        </div>

        {isLoading && (
          <div className="absolute bottom-0 left-0 w-full">
            <BarLoader
              width={"100%"}
              color="#a855f7"
            />
          </div>
        )}
      </nav>

      <OnboardingModal
        isOpen={showOnboarding}
        onClose={handleOnboardingSkip}
        onComplete={handleOnboardingComplete}
      />

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() =>
          setShowUpgradeModal(false)
        }
        trigger="header"
      />
    </>
  );
}