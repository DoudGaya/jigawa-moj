"use client";

import { useEffect, useState, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyPaymentAction } from "@/actions/filings";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!reference) {
      setStatus("error");
      return;
    }

    startTransition(() => {
      verifyPaymentAction(reference)
        .then((data) => {
          if (data.success) {
            setStatus("success");
          } else {
            setStatus("error");
          }
        })
        .catch(() => setStatus("error"));
    });
  }, [reference]);

  return (
    <div className="container mx-auto py-20 flex justify-center">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle>Payment Status</CardTitle>
          <CardDescription>Verifying your transaction...</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          {status === "loading" && (
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
          )}
          {status === "success" && (
            <>
              <CheckCircle2 className="h-16 w-16 text-green-500" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Payment Successful!</h3>
                <p className="text-muted-foreground">
                  Your filing has been submitted and is now under review.
                </p>
                <p className="text-sm text-muted-foreground">Reference: {reference}</p>
              </div>
              <Button onClick={() => router.push("/user/e-filing")}>
                Return to Dashboard
              </Button>
            </>
          )}
          {status === "error" && (
            <>
              <XCircle className="h-16 w-16 text-red-500" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Payment Failed</h3>
                <p className="text-muted-foreground">
                  We couldn't verify your payment. Please contact support if you believe this is an error.
                </p>
              </div>
              <Button variant="outline" onClick={() => router.push("/user/e-filing")}>
                Return to Dashboard
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessPage;
