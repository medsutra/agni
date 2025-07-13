import { useState, useRef } from "react";
import { Send, Bot, User, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSendMessage, useClearChat, useChatHistory } from "@/hooks/useChat";
import { useToast } from "@/hooks/use-toast";
import { ChatMessage } from "@/types";
import { addMinutes, formatDistanceToNow } from "date-fns";
import { useUserId } from "@/hooks/useUserId";
import { useParams } from "react-router";
import Markdown from "react-markdown";

export function ChatInterface() {
  const { toast } = useToast();
  const { userId } = useUserId();
  const { chatId } = useParams();
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const { data: chatHistory, isLoading } = useChatHistory({
    chatId: chatId || "",
  });
  const sendMessage = useSendMessage({
    userId: userId || "",
    chatId: chatId || "",
  });
  const clearChat = useClearChat({
    userId: userId || "",
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message;
    setMessage("");
    setIsTyping(true);

    try {
      await sendMessage.mutateAsync({
        message: userMessage,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = async () => {
    try {
      await clearChat.mutateAsync({});
      toast({
        title: "Chat cleared",
        description: "All messages have been cleared.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear chat. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderMessage = (msg: ChatMessage) => {
    return (
      <div
        key={msg.id}
        className={`flex ${
          msg.owner === "USER" ? "justify-end" : "justify-start"
        } mb-4 px-2 sm:px-0`}
      >
        <div
          className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-3 sm:px-4 py-2 sm:py-3 rounded-lg ${
            msg.owner === "USER"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-900"
          }`}
        >
          <div className="flex items-center space-x-2 mb-1 text-xs sm:text-sm">
            {msg.owner === "USER" ? (
              <User className="h-4 w-4" />
            ) : (
              <Bot className="h-4 w-4" />
            )}
            <span className="text-xs opacity-70 hidden sm:inline">
              {formatDistanceToNow(addMinutes(new Date(msg.createdAt), 330), {
                addSuffix: true,
              })}
            </span>
          </div>
          <p className="text-sm leading-relaxed break-words">
            <Markdown>{msg.message}</Markdown>
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 h-full flex flex-col pt-16 md:pt-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Chat Interface</h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearChat}
            disabled={clearChat.isPending}
            className="w-full sm:w-auto"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Chat
          </Button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-4">
          <CardTitle>General Chat</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 pr-2 md:pr-4" ref={scrollAreaRef}>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              </div>
            ) : chatHistory?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Bot className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>No messages yet. Start a conversation!</p>
                <p className="text-sm mt-2">
                  Ask general questions or select a report to get specific
                  insights.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {chatHistory?.map(renderMessage)}
                {isTyping && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-gray-100 text-gray-900 max-w-[80%] sm:max-w-xs lg:max-w-md px-4 py-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Bot className="h-4 w-4" />
                        <span className="text-xs opacity-70">Typing...</span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          <form onSubmit={handleSendMessage} className="flex gap-2 mt-4">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={sendMessage.isPending}
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={sendMessage.isPending || !message.trim()}
              className="shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
