import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reportsApi } from "@/services/reports";

export const useReports = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: ["reports", userId],
    queryFn: () =>
      reportsApi.getReports({
        userId,
      }),
    enabled: !!userId,
  });
};

export const useReport = ({ reportId }: { reportId: string }) => {
  return useQuery({
    queryKey: ["report", reportId],
    queryFn: () => reportsApi.getReportById(reportId),
    enabled: !!reportId,
  });
};

export const useSearchReports = ({
  query,
  userId,
}: {
  query: string;
  userId: string;
}) => {
  return useQuery({
    queryKey: ["reports", "search", query],
    queryFn: () =>
      reportsApi.searchReports({
        query,
        userId,
      }),
    enabled: !!query,
  });
};

export const useUploadReport = ({ userId }: { userId: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      file,
      onProgress,
    }: {
      file: File;
      onProgress?: (progress: number) => void;
    }) => reportsApi.uploadReport(file, userId, onProgress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });
};

export const useDeleteReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reportsApi.deleteReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });
};
