import { apiClient } from "@/lib/api";
import { ChatMessage, ApiResponse } from "@/types";

export const chatApi = {
  getChatHistory: async (reportId?: string): Promise<ChatMessage[]> => {
    const url = reportId
      ? `/chat/history?reportId=${reportId}`
      : "/chat/history";
    const response = await apiClient.get<ApiResponse<ChatMessage[]>>(url);
    return response.data.data;
  },

  sendMessage: async (message: string): Promise<ChatMessage> => {
    const response = await apiClient.post<ApiResponse<ChatMessage>>(
      "/report/chat",
      {
        user_message: message,
        user_id: "default_user_id",
      }
    );
    return response.data.data;
  },

  clearChatHistory: async (reportId?: string): Promise<void> => {
    const url = reportId ? `/chat/clear?reportId=${reportId}` : "/chat/clear";
    await apiClient.delete(url);
  },
};
