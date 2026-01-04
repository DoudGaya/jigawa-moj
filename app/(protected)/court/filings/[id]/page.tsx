import { getFilingById } from "@/actions/filings";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FilingReviewActions } from "@/components/court/FilingReviewActions";
import { notFound } from "next/navigation";
import { format } from "date-fns";

interface PageProps {
  params: Promise<{ id: string }>;
}

const FilingDetailPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const filing = await getFilingById(id);

  if (!filing) return notFound();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Filing Review</h1>
          <p className="text-muted-foreground">ID: {filing.id}</p>
        </div>
        <Badge variant={
          filing.status === "Accepted" ? "default" :
          filing.status === "Rejected" ? "destructive" :
          "secondary"
        } className="text-lg px-4 py-1">
          {filing.status}
        </Badge>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Applicant Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Name</p>
              <p>{filing.user.firstName} {filing.user.lastName}</p>
            </div>
            <div>
              <p className="font-semibold">Email</p>
              <p>{filing.user.email}</p>
            </div>
            <div>
              <p className="font-semibold">Phone</p>
              <p>{filing.user.phone || "N/A"}</p>
            </div>
            <div>
              <p className="font-semibold">Filed At</p>
              <p>{format(new Date(filing.filedAt), "PPP p")}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Filing Details: {filing.filingType.replace(/_/g, " ")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {filing.affidavit && (
              <>
                <div>
                  <p className="font-semibold">Title</p>
                  <p>{filing.affidavit.title}</p>
                </div>
                <div>
                  <p className="font-semibold">Deponent Name</p>
                  <p>{filing.affidavit.deponentName}</p>
                </div>
                <div>
                  <p className="font-semibold">Sworn At</p>
                  <p>{filing.affidavit.swornAt}</p>
                </div>
                <div>
                  <p className="font-semibold">Content</p>
                  <div className="bg-muted p-4 rounded-md whitespace-pre-wrap">
                    {filing.affidavit.content}
                  </div>
                </div>
              </>
            )}

            {filing.declaration && (
              <>
                <div>
                  <p className="font-semibold">Declarant Name</p>
                  <p>{filing.declaration.declarantName}</p>
                </div>
                <div>
                  <p className="font-semibold">Person's Name</p>
                  <p>{filing.declaration.personName}</p>
                </div>
                <div>
                  <p className="font-semibold">Relationship</p>
                  <p>{filing.declaration.relationship}</p>
                </div>
                <div>
                  <p className="font-semibold">Date of Birth</p>
                  <p>{format(new Date(filing.declaration.dateOfBirth), "PPP")}</p>
                </div>
                <div>
                  <p className="font-semibold">Place of Birth</p>
                  <p>{filing.declaration.placeOfBirth}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent>
            {filing.transactions.map((tx) => (
              <div key={tx.id} className="flex justify-between items-center border-b last:border-0 py-2">
                <div>
                  <p className="font-medium">{tx.paymentFor}</p>
                  <p className="text-sm text-muted-foreground">Ref: {tx.paymentRef}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₦{parseInt(tx.amount).toLocaleString()}</p>
                  <Badge variant="outline">{tx.paymentStatus}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <FilingReviewActions filingId={filing.id} currentStatus={filing.status} />
      </div>
    </div>
  );
};

export default FilingDetailPage;
