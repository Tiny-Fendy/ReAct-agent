// 全局类型声明
declare global {
  interface Window {
    electronAPI?: {
      sendMessage: (message: string) => Promise<{
        success: boolean;
        data?: {
          role: string;
          content: string;
          timestamp: number;
        };
        error?: string;
      }>;
      onMessage: (callback: (data: any) => void) => () => void;
      getAppInfo: () => {
        platform: string;
        nodeVersion: string;
        chromeVersion: string;
        electronVersion: string;
      };
    };
  }
}

// 消息类型
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

// 对话状态
export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}
