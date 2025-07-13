import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Report } from "@/types";
import { cn } from "@/lib/utils";

interface ReportCardProps {
  report: Report;
  onView?: (id: string) => void;
  onDownload?: (id: string) => void;
}

export function ReportCard({ report }: ReportCardProps) {
  // const formatFileSize = (bytes: number) => {
  //   if (bytes === 0) return "0 Bytes";
  //   const k = 1024;
  //   const sizes = ["Bytes", "KB", "MB", "GB"];
  //   const i = Math.floor(Math.log(bytes) / Math.log(k));
  //   return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  // };

  const getStatusColor = (status: Report["status"]) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "PROCESSING":
        return "bg-yellow-100 text-yellow-800";
      case "FAILED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0 truncate">
              <CardTitle className="text-base md:text-lg truncate">
                {report.title || "No Title"}
              </CardTitle>
            </div>
          </div>
          <Badge className={cn(getStatusColor(report.status), "shrink-0 ")}>
            {report.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* <div className="text-sm text-gray-500">
            Uploaded{" "}
            {formatDistanceToNow(new Date(report.uploadDate), {
              addSuffix: true,
            })}
          </div> */}
          {report.summary && (
            <p className="text-sm text-gray-700 line-clamp-2">
              {report.summary}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
