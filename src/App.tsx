import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/toaster";
import { Sidebar } from "@/components/layout/Sidebar";
import { ReportsList } from "@/components/reports/ReportsList";
import { FileUpload } from "@/components/upload/FileUpload";
import { ChatInterface } from "@/components/chat/ChatInterface";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [activeTab, setActiveTab] = useState("reports");

  const renderContent = () => {
    switch (activeTab) {
      case "reports":
        return <ReportsList />;
      case "upload":
        return <FileUpload />;
      case "chat":
        return <ChatInterface />;
      default:
        return <ReportsList />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex w-full h-screen bg-gray-50 relative">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 overflow-auto  px-6 md:ml-0">
          {renderContent()}
        </main>
      </div>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
