import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/toaster";
import { Sidebar } from "@/components/layout/Sidebar";
import { ReportsList } from "@/components/reports/ReportsList";
import { FileUpload } from "@/components/upload/FileUpload";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { useUserId } from "./hooks/useUserId";
import { BrowserRouter, Routes, Route } from "react-router";
import { ChatList } from "./components/chat/ChatList";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  useUserId();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div className="flex w-full h-screen bg-gray-50 relative">
          <Sidebar />
          <main className="flex-1 overflow-auto  px-6 md:ml-0">
            <Routes>
              <Route element={<ReportsList />} path="/" />
              <Route element={<FileUpload />} path="/upload" />
              <Route element={<ChatList />} path="/chat" />
              <Route element={<ChatInterface />} path="/chat/:chatId" />
            </Routes>
          </main>
        </div>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
