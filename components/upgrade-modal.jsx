"use client";

import { Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function UpgradeModal({ isOpen, onClose, trigger = "limit" }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-purple-500" />
            <DialogTitle className="text-2xl">
              Upgrade to Pro
            </DialogTitle>
          </div>

          <DialogDescription>
            {trigger === "header" &&
              "Create Unlimited Events with Pro! "}

            {trigger === "limit" &&
              "You've reached your free event limit. "}

            {trigger === "color" &&
              "Custom theme colors are a Pro feature. "}

            Unlock unlimited events and premium features!
          </DialogDescription>
        </DialogHeader>

        {/* Custom Content */}
        <div className="border rounded-lg p-6 text-center space-y-3">
          <h2 className="text-xl font-semibold">
            Pro Features Coming Soon 🚀
          </h2>

          <p className="text-gray-500">
            Unlimited events, premium themes, AI tools and more.
          </p>
        </div>

        {/* Footer */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}