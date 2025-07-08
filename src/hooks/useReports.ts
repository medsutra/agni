import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reportsApi } from '@/services/reports';
import { Report } from '@/types';

export const useReports = () => {
  return useQuery({
    queryKey: ['reports'],
    queryFn: reportsApi.getReports,
  });
};

export const useReport = (reportId: string) => {
  return useQuery({
    queryKey: ['report', reportId],
    queryFn: () => reportsApi.getReportById(reportId),
    enabled: !!reportId,
  });
};

export const useSearchReports = (query: string) => {
  return useQuery({
    queryKey: ['reports', 'search', query],
    queryFn: () => reportsApi.searchReports(query),
    enabled: !!query,
  });
};

export const useUploadReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file, onProgress }: { file: File; onProgress?: (progress: number) => void }) =>
      reportsApi.uploadReport(file, onProgress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
  });
};

export const useDeleteReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reportsApi.deleteReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
  });
};