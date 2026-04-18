import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, type LucideIcon } from "lucide-react";
import { useAdminDownloads } from "@/hooks/useAdminDownloads";
import type { AdminDownloadItem, DefaultDownloadOverride } from "@/lib/downloads/adminDownloadsStore";
import { BUILTIN_DOWNLOADS } from "@/lib/downloads/defaultDownloads";
import { DOWNLOAD_ICONS } from "@/lib/downloads/downloadIcons";

type DownloadRow = {
  key: string;
  title: string;
  description: string;
  icon: LucideIcon;
  size: string;
  format: string;
  category: string;
  url: string;
  fileName?: string;
};

function adminItemToRow(item: AdminDownloadItem): DownloadRow {
  const IconComponent = DOWNLOAD_ICONS[item.iconKey];
  const url = item.externalUrl ?? item.fileDataUrl ?? "#";
  return {
    key: item.id,
    title: item.title,
    description: item.description,
    icon: IconComponent,
    size: item.size,
    format: item.format,
    category: item.category,
    url,
    fileName: item.fileName,
  };
}

function builtinToRow(
  builtin: (typeof BUILTIN_DOWNLOADS)[number],
  o: DefaultDownloadOverride | undefined
): DownloadRow {
  const iconKey = o?.iconKey ?? builtin.iconKey;
  return {
    key: builtin.key,
    title: o?.title ?? builtin.title,
    description: o?.description ?? builtin.description,
    icon: DOWNLOAD_ICONS[iconKey],
    size: o?.size ?? builtin.size,
    format: o?.format ?? builtin.format,
    category: o?.category ?? builtin.category,
    url: o?.externalUrl ?? o?.fileDataUrl ?? builtin.url,
    fileName: o?.fileName ?? builtin.fileName,
  };
}

const DownloadsSection = () => {
  const { items: adminItems, defaultOverrides } = useAdminDownloads();

  const rows = useMemo(() => {
    const custom = adminItems.map(adminItemToRow);
    const builtins = BUILTIN_DOWNLOADS.map((b) => builtinToRow(b, defaultOverrides[b.key]));
    return [...custom, ...builtins];
  }, [adminItems, defaultOverrides]);

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Downloads</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access important documents, brochures, syllabus, and forms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rows.map((item) => {
            const IconComponent = item.icon;
            return (
              <Card key={item.key} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-3 bg-primary rounded-lg">
                      <IconComponent className="h-8 w-8 text-white " />
                    </div>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{item.category}</span>
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-muted-foreground block">Size: {item.size}</span>
                      <span className="text-xs text-muted-foreground">{item.format}</span>
                    </div>
                    <Button
                      size="sm"
                      className="gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                      asChild
                    >
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={item.fileName}
                      >
                        <Download className="h-4 w-4 " />
                        Download
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DownloadsSection;
