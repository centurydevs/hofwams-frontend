"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Download, CheckCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "Paid" | "Pending";
}

const planFeatures = [
  "Unlimited users",
  "Advanced reporting",
  "Priority support",
  "Custom integrations",
  "API access",
];

export default function BillingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [invoices] = useState<Invoice[]>([
    { id: "INV-001", date: "2023-05-01", amount: 29, status: "Paid" },
    { id: "INV-002", date: "2023-06-01", amount: 29, status: "Paid" },
    { id: "INV-003", date: "2023-07-01", amount: 29, status: "Pending" },
  ]);

  const monthlyPrice = 29;
  const yearlyPrice = 290;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Billing</h1>

      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Your Plan</CardTitle>
          <CardDescription>You are currently on the Pro plan.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold">
                {isYearly ? `$${yearlyPrice}` : `$${monthlyPrice}`}
              </h3>
              <p className="text-muted-foreground">
                {isYearly ? "per year" : "per month"}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="yearly-billing">Yearly billing</Label>
              <Switch
                id="yearly-billing"
                checked={isYearly}
                onCheckedChange={setIsYearly}
              />
            </div>
          </div>
          <ul className="space-y-2">
            {planFeatures.map((feature, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Upgrade Plan</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <CreditCard className="h-6 w-6" />
          <div>
            <p className="font-medium">Visa ending in 1234</p>
            <p className="text-sm text-muted-foreground">Expires 12/2025</p>
          </div>
          <Button variant="outline">Update</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Download</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>${invoice.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        invoice.status === "Paid" ? "default" : "secondary"
                      }
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
