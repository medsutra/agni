import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useUploadReport } from "@/hooks/useReports";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useUserId } from "@/hooks/useUserId";

interface FileUploadProps {}

export function FileUpload({}: FileUploadProps) {
  const { toast } = useToast();
  const { userId } = useUserId();
  const uploadReport = useUploadReport({
    userId: userId || "",
  });
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "text/plain": [".txt"],
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
        "image/jpeg",
      ],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const handleUpload = async (file: File) => {
    try {
      await uploadReport.mutateAsync({
        file,
        onProgress: (progress) => {
          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: progress,
          }));
        },
      });

      toast({
        title: "Upload successful",
        description: `${file.name} has been uploaded and is being processed.`,
      });

      setUploadedFiles((prev) => prev.filter((f) => f.name !== file.name));
      setUploadProgress((prev) => {
        const newProgress = { ...prev };
        delete newProgress[file.name];
        return newProgress;
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: `Failed to upload ${file.name}. Please try again.`,
        variant: "destructive",
      });
    }
  };

  const removeFile = (fileName: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="p-4 md:p-6 space-y-6 pt-16 md:pt-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Upload Reports
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Upload your reports in PDF, DOC, DOCX, TXT, CSV, XLS, or XLSX format
          (max 10MB)
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-6 md:p-8 text-center cursor-pointer transition-colors",
              isDragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            )}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-8 w-8 md:h-12 md:w-12 text-gray-400 mb-4" />
            {isDragActive ? (
              <p className="text-blue-600 text-sm md:text-base">
                Drop the files here...
              </p>
            ) : (
              <div>
                <p className="text-gray-600 mb-2 text-sm md:text-base">
                  Drag and drop files here, or click to select files
                </p>
                <p className="text-sm text-gray-500">
                  Supports PDF, DOC, DOCX, TXT, CSV, XLS, XLSX files up to 10MB
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Files Ready to Upload</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uploadedFiles.map((file, index) => {
                const progress = uploadProgress[file.name] || 0;
                const isUploading = uploadReport.isPending && progress > 0;
                const isCompleted = progress === 100;

                return (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <File className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate text-sm md:text-base">
                        {file.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                      {isUploading && (
                        <div className="mt-2">
                          <Progress value={progress} className="h-2" />
                          <p className="text-sm text-gray-500 mt-1">
                            {progress}% uploaded
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 self-end sm:self-center">
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : isUploading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                      ) : (
                        <>
                          <Button
                            onClick={() => handleUpload(file)}
                            disabled={uploadReport.isPending}
                            size="sm"
                          >
                            Upload
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFile(file.name)}
                            disabled={uploadReport.isPending}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {uploadReport.isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Upload failed. Please check your file and try again.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
