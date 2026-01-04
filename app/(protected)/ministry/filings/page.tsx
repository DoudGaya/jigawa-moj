import { getCourtFilings, getFilingStats } from "@/actions/filings";
import { PaymentStatus } from "@prisma/client";
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
import { format } from "date-fns";

const MinistryFilingsPage = async () => {
  const filings = await getCourtFilings();
  const stats = await getFilingStats();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Ministry Filing Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{stats.revenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Filings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.accepted}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Filings</CardTitle>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {filings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No filings found.
                  </TableCell>
                </TableRow>
              ) : (
                filings.map((filing) => (
                  <TableRow key={filing.id}>
                    <TableCell>{format(new Date(filing.filedAt), "MMM d, yyyy")}</TableCell>
                    <TableCell>
                      {filing.user.firstName} {filing.user.lastName}
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
                      {filing.transactions?.[0]?.paymentStatus === PaymentStatus.PAID ? (
                        <Badge variant="outline" className="text-green-600 border-green-600">Paid</Badge>
                      ) : (
                        <Badge variant="outline" className="text-yellow-600 border-yellow-600">Pending</Badge>
                      )}
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

export default MinistryFilingsPage;
