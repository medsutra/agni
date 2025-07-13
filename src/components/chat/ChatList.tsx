import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useUserId } from "@/hooks/useUserId";
import { useChats } from "@/hooks/useChat";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { formatDate } from "date-fns";

export function ChatList() {
  const { userId } = useUserId();
  const {
    data: chats,
    isLoading,
    error,
  } = useChats({
    userId: userId || "",
  });

  const isLoadingData = isLoading;

  if (error) {
    return (
      <Alert className="m-4">
        <AlertDescription>
          Failed to load chats. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 pt-16 md:pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Chats</h2>
        <div></div>
      </div>

      {isLoadingData ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      ) : (
        <div className=" flex flex-col gap-4 ">
          {chats?.map((chat) => (
            <div key={chat.id} className=" border rounded-md shadow p-4 ">
              <h2 className=" text-xl font-semibold ">{chat.title}</h2>
              <p className=" text-sm text-gray-700 ">
                {formatDate(new Date(chat.createdAt), "dd MMM yyyy")}
              </p>
              <div className=" flex items-center justify-end ">
                <Link to={`/chat/${chat.id}`}>
                  <Button>Continue to chat</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoadingData && chats?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No chats found</p>
        </div>
      )}
    </div>
  );
}
