import { apiClient } from "@/lib/api";
import { Report, ApiResponse } from "@/types";

export const reportsApi = {
  getReports: async (): Promise<Report[]> => {
    const response = await apiClient.get<ApiResponse<Report[]>>("/reports");
    return response.data.data;
  },

  uploadReport: async (
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<Report> => {
    const formData = new FormData();
    formData.append("uploaded_file", file);

    const response = await apiClient.post<ApiResponse<Report>>(
      "/report/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(progress);
          }
        },
      }
    );

    return response.data.data;
  },

  deleteReport: async (reportId: string): Promise<void> => {
    await apiClient.delete(`/reports/${reportId}`);
  },

  getReportById: async (reportId: string): Promise<Report> => {
    const response = await apiClient.get<ApiResponse<Report>>(
      `/reports/${reportId}`
    );
    return response.data.data;
  },

  searchReports: async (query: string): Promise<Report[]> => {
    const response = await apiClient.get<ApiResponse<Report[]>>(
      `/reports/search?q=${encodeURIComponent(query)}`
    );
    return response.data.data;
  },
};
