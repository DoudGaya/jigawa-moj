import { getCourtFilings } from "@/actions/filings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";

const CourtFilingsPage = async () => {
  const filings = await getCourtFilings();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Filing Review Queue</h1>
      <Card>
        <CardHeader>
          <CardTitle>All Filings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Applicant</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No filings found.
                  </TableCell>
                </TableRow>
              ) : (
                filings.map((filing) => (
                  <TableRow key={filing.id}>
                    <TableCell>{format(new Date(filing.filedAt), "MMM d, yyyy")}</TableCell>
                    <TableCell>
                      {filing.user.firstName} {filing.user.lastName}
                      <br />
                      <span className="text-xs text-muted-foreground">{filing.user.email}</span>
                    </TableCell>
                    <TableCell className="capitalize">
                      {filing.filingType.replace(/_/g, " ").toLowerCase()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        filing.status === "Accepted" ? "default" :
                        filing.status === "Rejected" ? "destructive" :
                        "secondary"
                      }>
                        {filing.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {filing.transactions[0]?.paymentStatus === "PAID" ? (
                        <Badge variant="outline" className="text-green-600 border-green-600">Paid</Badge>
                      ) : (
                        <Badge variant="outline" className="text-yellow-600 border-yellow-600">Pending</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/court/filings/${filing.id}`}>Review</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourtFilingsPage;
