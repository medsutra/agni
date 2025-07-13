import { apiClient } from "@/lib/api";
import { Report, ApiResponse } from "@/types";

export const reportsApi = {
  getReports: async ({ userId }: { userId: string }): Promise<Report[]> => {
    const response = await apiClient.get<ApiResponse<Report[]>>(
      `/report?user_id=${userId}`
    );
    return response.data.data;
  },

  uploadReport: async (
    file: File,
    userId: string,
    onProgress?: (progress: number) => void
  ): Promise<Report> => {
    const formData = new FormData();
    formData.append("uploaded_file", file);

    const response = await apiClient.post<ApiResponse<Report>>(
      `/report/upload?user_id=${userId}`,
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
    await apiClient.delete(`/report/${reportId}`);
  },

  getReportById: async (reportId: string): Promise<Report> => {
    const response = await apiClient.get<ApiResponse<Report>>(
      `/reports/${reportId}`
    );
    return response.data.data;
  },

  searchReports: async ({
    query,
    userId,
  }: {
    query: string;
    userId: string;
  }): Promise<Report[]> => {
    const response = await apiClient.get<ApiResponse<Report[]>>(
      `/report/search?q=${encodeURIComponent(query)}&user_id=${userId}`
    );
    return response.data.data;
  },
};
