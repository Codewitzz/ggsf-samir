import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type FeeRow = {
  item: string;
  amount: string;
  note?: string;
};

type FeeStructureProps = {
  title: string;
  subtitle?: string;
  rows: FeeRow[];
  footerNote?: string;
  accent?: "primary" | "secondary" | "info" | "warning" | "success";
};

const FeeStructure = ({
  title,
  subtitle,
  rows,
  footerNote,
  accent = "primary",
}: FeeStructureProps) => {
  const accentBorder =
    accent === "secondary"
      ? "border-secondary"
      : accent === "info"
      ? "border-info"
      : accent === "warning"
      ? "border-warning"
      : accent === "success"
      ? "border-success"
      : "border-primary";

  const accentText =
    accent === "secondary"
      ? "text-secondary"
      : accent === "info"
      ? "text-info"
      : accent === "warning"
      ? "text-warning"
      : accent === "success"
      ? "text-success"
      : "text-primary";

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        {subtitle ? <p className="text-muted-foreground">{subtitle}</p> : null}
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className={`border-t-4 ${accentBorder}`}>
                <th className="text-left px-4 py-3 font-semibold">Particulars</th>
                <th className="text-right px-4 py-3 font-semibold">Amount (₹)</th>
                <th className="text-left px-4 py-3 font-semibold">Note</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-4 py-3">{r.item}</td>
                  <td className="px-4 py-3 text-right font-medium">{r.amount}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.note || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {footerNote ? (
          <div className={`px-4 py-3 border-t ${accentBorder}/40`}>
            <p className={`${accentText} text-xs`}>{footerNote}</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default FeeStructure;


