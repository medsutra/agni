import { apiClient } from "@/lib/api";
import { ChatMessage, ApiResponse, IChat } from "@/types";

export const chatApi = {
  getChats: async ({ userId }: { userId: string }): Promise<IChat[]> => {
    const response = await apiClient.get<ApiResponse<IChat[]>>(
      `/chat?user_id=${userId}`
    );
    return response.data.data;
  },

  getChatHistory: async ({
    chatId,
  }: {
    chatId: string;
  }): Promise<ChatMessage[]> => {
    const response = await apiClient.get<ApiResponse<ChatMessage[]>>(
      `/chat/${chatId}`
    );
    return response.data.data;
  },

  sendMessage: async ({
    message,
    userId,
    chatId,
  }: {
    message: string;
    userId: string;
    chatId?: string;
  }): Promise<ChatMessage> => {
    const response = await apiClient.post<ApiResponse<ChatMessage>>("/chat", {
      user_message: message,
      user_id: userId,
      chatId: chatId,
    });
    return response.data.data;
  },

  clearChatHistory: async ({
    reportId,
    userId,
  }: {
    reportId?: string;
    userId: string;
  }): Promise<void> => {
    const url = reportId
      ? `/chat/clear?reportId=${reportId}&user_id=${userId}`
      : `/chat/clear/user_id=${userId}`;
    await apiClient.delete(url);
  },
};
