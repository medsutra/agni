import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { chatApi } from "@/services/chat";
import { ChatMessage } from "@/types";

export const useChatHistory = (reportId?: string) => {
  return useQuery({
    queryKey: ["chat", reportId],
    queryFn: () => chatApi.getChatHistory(reportId),
  });
};

export const useSendMessage = () => {
  return useMutation({
    mutationFn: ({ message }: { message: string }) =>
      chatApi.sendMessage(message),
  });
};

export const useClearChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: chatApi.clearChatHistory,
    onSuccess: (_, reportId) => {
      queryClient.invalidateQueries({ queryKey: ["chat", reportId] });
    },
  });
};
