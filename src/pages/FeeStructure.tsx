import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IndianRupee } from "lucide-react";

const FeeStructure = () => {
  const engineeringFees = [
    { year: "First Year", tuition: "1,25,000", development: "15,000", library: "5,000", exam: "3,000", total: "1,48,000" },
    { year: "Second Year", tuition: "1,25,000", development: "15,000", library: "5,000", exam: "3,000", total: "1,48,000" },
    { year: "Third Year", tuition: "1,25,000", development: "15,000", library: "5,000", exam: "3,000", total: "1,48,000" },
    { year: "Fourth Year", tuition: "1,25,000", development: "15,000", library: "5,000", exam: "3,000", total: "1,48,000" },
  ];

  const mbaFees = [
    { year: "First Year", tuition: "2,50,000", development: "25,000", library: "8,000", exam: "5,000", total: "2,88,000" },
    { year: "Second Year", tuition: "2,50,000", development: "25,000", library: "8,000", exam: "5,000", total: "2,88,000" },
  ];

  const oneTimeFees = [
    { item: "Admission Fee", amount: "10,000" },
    { item: "Registration Fee", amount: "5,000" },
    { item: "Caution Money (Refundable)", amount: "10,000" },
    { item: "Alumni Association Fee", amount: "2,000" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl space-y-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Fee Structure</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Transparent fee structure for all programs. All fees are subject to change as per university guidelines.
            </p>
          </div>

          {/* Engineering Fee Structure */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <IndianRupee className="h-6 w-6" />
                Engineering Programs (B.E.)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Year</TableHead>
                      <TableHead>Tuition Fee</TableHead>
                      <TableHead>Development Fee</TableHead>
                      <TableHead>Library Fee</TableHead>
                      <TableHead>Exam Fee</TableHead>
                      <TableHead className="font-bold">Total (per year)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {engineeringFees.map((fee, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{fee.year}</TableCell>
                        <TableCell>₹{fee.tuition}</TableCell>
                        <TableCell>₹{fee.development}</TableCell>
                        <TableCell>₹{fee.library}</TableCell>
                        <TableCell>₹{fee.exam}</TableCell>
                        <TableCell className="font-bold text-primary">₹{fee.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* MBA Fee Structure */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <IndianRupee className="h-6 w-6" />
                MBA Programs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Year</TableHead>
                      <TableHead>Tuition Fee</TableHead>
                      <TableHead>Development Fee</TableHead>
                      <TableHead>Library Fee</TableHead>
                      <TableHead>Exam Fee</TableHead>
                      <TableHead className="font-bold">Total (per year)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mbaFees.map((fee, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{fee.year}</TableCell>
                        <TableCell>₹{fee.tuition}</TableCell>
                        <TableCell>₹{fee.development}</TableCell>
                        <TableCell>₹{fee.library}</TableCell>
                        <TableCell>₹{fee.exam}</TableCell>
                        <TableCell className="font-bold text-primary">₹{fee.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* One-Time Fees */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">One-Time Fees (Payable at Admission)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {oneTimeFees.map((fee, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border border-border rounded-lg">
                    <span className="font-medium">{fee.item}</span>
                    <span className="text-primary font-bold">₹{fee.amount}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="text-2xl">Important Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Payment Schedule:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Fees can be paid in two installments per academic year</li>
                  <li>First installment: 60% at the time of admission</li>
                  <li>Second installment: 40% before the start of second semester</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Scholarships & Financial Aid:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Merit-based scholarships available for top performers</li>
                  <li>Government scholarships for SC/ST/OBC/NT/SBC/EBC categories</li>
                  <li>Need-based financial assistance for eligible students</li>
                  <li>Sports and cultural achievement scholarships</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Note:</h3>
                <p className="text-muted-foreground">
                  All fees are subject to revision as per university and government guidelines. 
                  For the most current fee structure, please contact the admissions office.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default FeeStructure;

