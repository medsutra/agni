import { useState } from "react";
import {
  FileText,
  MessageCircle,
  Upload,
  Menu,
  X,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const location = useLocation();

  const activeTab = location.pathname.replaceAll("/", "");

  const navItems = [
    { id: "", label: "Reports", icon: FileText },
    { id: "upload", label: "Upload", icon: Upload },
    { id: "chat", label: "Chat", icon: MessageCircle },
  ];

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden h-10 w-10 p-0 bg-white shadow-md border text-gray-900"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div
        className={cn(
          "flex flex-col bg-white border-r border-gray-200 transition-all duration-300 z-50",
          "fixed md:relative inset-y-0 left-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "md:flex",
          isCollapsed ? "md:w-16" : "md:w-64",
          "w-64"
        )}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {(!isCollapsed || isMobileOpen) && (
              <h1 className="text-xl font-bold text-gray-900">ReportChat</h1>
            )}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileOpen(false)}
                className="h-8 w-8 p-0 md:hidden text-gray-900"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="h-8 w-8 p-0 hidden md:flex text-gray-900"
              >
                {isCollapsed ? (
                  <Menu className="h-4 w-4" />
                ) : (
                  <X className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link to={`/${item.id}`}>
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isCollapsed && !isMobileOpen && "md:justify-center md:px-2",
                    activeTab === item.id
                      ? "text-white"
                      : "text-gray-900 hover:text-gray-900 hover:bg-gray-100"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {(!isCollapsed || isMobileOpen) && (
                    <span className="ml-2">{item.label}</span>
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
