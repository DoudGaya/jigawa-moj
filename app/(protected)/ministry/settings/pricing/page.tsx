import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const PricingSettingsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Pricing Configuration</h1>
      
      <div className="grid gap-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Filing Fees</CardTitle>
            <CardDescription>Set the base fees for different filing types.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="affidavit-fee">Affidavit Fee (₦)</Label>
              <Input id="affidavit-fee" type="number" defaultValue="500" />
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor="declaration-fee">Declaration of Age Fee (₦)</Label>
              <Input id="declaration-fee" type="number" defaultValue="500" />
            </div>
            <div className="flex justify-end mt-4">
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PricingSettingsPage;
