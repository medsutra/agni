export interface Report {
  id: string;
  name: string;
  filename: string;
  size: number;
  type: string;
  uploadDate: string;
  status: 'processing' | 'ready' | 'error';
  summary?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  reportId?: string;
}

export interface UploadProgress {
  progress: number;
  status: 'uploading' | 'processing' | 'complete' | 'error';
  message?: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}