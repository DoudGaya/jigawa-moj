"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { courtReviewFiling } from "@/actions/filings";
import { FilingStatus } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface FilingReviewActionsProps {
  filingId: string;
  currentStatus: FilingStatus;
}

export const FilingReviewActions = ({ filingId, currentStatus }: FilingReviewActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAction = (status: FilingStatus) => {
    startTransition(() => {
      courtReviewFiling(filingId, status)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          } else {
            toast.success(data.success);
            router.refresh();
          }
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <div className="flex gap-4 mt-6">
      <Button
        onClick={() => handleAction(FilingStatus.Accepted)}
        disabled={isPending || currentStatus === FilingStatus.Accepted}
        className="bg-green-600 hover:bg-green-700"
      >
        Accept Filing
      </Button>
      <Button
        onClick={() => handleAction(FilingStatus.Rejected)}
        disabled={isPending || currentStatus === FilingStatus.Rejected}
        variant="destructive"
      >
        Reject Filing
      </Button>
    </div>
  );
};
