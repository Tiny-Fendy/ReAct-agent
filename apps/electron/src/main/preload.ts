import { contextBridge, ipcRenderer } from 'electron';

// 定义类型
interface MessageResponse {
  success: boolean;
  data?: {
    role: string;
    content: string;
    timestamp: number;
  };
  error?: string;
}

// 暴露安全的 API 给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 发送消息到主进程
  sendMessage: (message: string): Promise<MessageResponse> => {
    return ipcRenderer.invoke('send-message', message);
  },

  // 监听来自主进程的消息
  onMessage: (callback: (data: any) => void) => {
    const subscription = (_event: any, data: any) => callback(data);
    ipcRenderer.on('on-message', subscription);
    return () => {
      ipcRenderer.removeListener('on-message', subscription);
    };
  },

  // 获取应用版本等信息
  getAppInfo: () => ({
    platform: process.platform,
    nodeVersion: process.versions.node,
    chromeVersion: process.versions.chrome,
    electronVersion: process.versions.electron,
  }),
});
