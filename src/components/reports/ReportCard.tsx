import { formatDistanceToNow } from "date-fns";
import { FileText, Trash2, Download, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Report } from "@/types";
import { cn } from "@/lib/utils";

interface ReportCardProps {
  report: Report;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
  onDownload?: (id: string) => void;
}

export function ReportCard({
  report,
  onDelete,
  onView,
  onDownload,
}: ReportCardProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getStatusColor = (status: Report["status"]) => {
    switch (status) {
      case "ready":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base md:text-lg truncate">
                {report.name}
              </CardTitle>
              <p className="text-sm text-gray-500 truncate">
                {report.filename}
              </p>
            </div>
          </div>
          <Badge className={cn(getStatusColor(report.status), "shrink-0")}>
            {report.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-sm text-gray-500">
            <span>Size: {formatFileSize(report.size)}</span>
            <span>Type: {report.type}</span>
          </div>
          <div className="text-sm text-gray-500">
            Uploaded{" "}
            {formatDistanceToNow(new Date(report.uploadDate), {
              addSuffix: true,
            })}
          </div>
          {report.summary && (
            <p className="text-sm text-gray-700 line-clamp-2">
              {report.summary}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView?.(report.id)}
              className="flex-1 text-xs sm:text-sm"
            >
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDownload?.(report.id)}
                className="text-xs sm:text-sm"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete?.(report.id)}
                className="text-red-600 hover:text-red-700 text-xs sm:text-sm"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
