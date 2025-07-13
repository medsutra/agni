type MessageOwner = "USER" | "MODEL";
type ReportStatus = "PROCESSING" | "COMPLETED" | "FAILED";

export interface Report {
  id: string;
  title: string;
  summary: string;
  status: ReportStatus;
}

export interface IChat {
  id: string;
  title: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  message: string;
  owner: MessageOwner;
  createdAt: string;
}

export interface UploadProgress {
  progress: number;
  status: "uploading" | "processing" | "complete" | "error";
  message?: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
