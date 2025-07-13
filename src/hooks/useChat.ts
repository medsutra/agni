import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { chatApi } from "@/services/chat";

export const useChatHistory = ({ chatId }: { chatId: string }) => {
  return useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      chatApi.getChatHistory({
        chatId,
      }),
  });
};

export const useChats = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: ["chat", userId],
    queryFn: () =>
      chatApi.getChats({
        userId,
      }),
  });
};

export const useSendMessage = ({
  userId,
  chatId,
}: {
  userId: string;
  chatId: string;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ message }: { message: string }) =>
      chatApi.sendMessage({
        message,
        userId,
        chatId,
      }),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["chat", chatId],
      });
    },
  });
};

export const useClearChat = ({ userId }: { userId: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reportId }: { reportId?: string }) =>
      chatApi.clearChatHistory({
        reportId,
        userId,
      }),
    onSuccess: (_, reportId) => {
      queryClient.invalidateQueries({ queryKey: ["chat", reportId] });
    },
  });
};
