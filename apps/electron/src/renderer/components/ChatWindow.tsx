import React, { useState, useRef, useEffect } from 'react';
import { Layout, Typography, Spin, message as AntMessage } from 'antd';
import { MessageList } from './MessageList';
import { InputArea } from './InputArea';
import type { Message } from '../../types';

const { Header, Content } = Layout;
const { Title } = Typography;

export const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好！我是 AI 助手，有什么我可以帮助你的吗？',
      timestamp: Date.now(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 发送消息处理
  const handleSendMessage = async (content: string) => {
    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // 调用 Electron API
      if (!window.electronAPI) {
        throw new Error('Electron API 不可用');
      }

      const response = await window.electronAPI.sendMessage(content);

      if (response.success && response.data) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response.data.content,
          timestamp: response.data.timestamp,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(response.error || '发送失败');
      }
    } catch (error) {
      console.error('发送消息失败:', error);
      AntMessage.error(
        error instanceof Error ? error.message : '发送消息失败，请重试'
      );

      // 添加错误提示消息
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `抱歉，发生错误：${error instanceof Error ? error.message : '未知错误'}`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Header
        style={{
          background: '#fff',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          AI 对话助手
        </Title>
      </Header>
      <Content
        style={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: '#fff',
        }}
      >
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 0',
          }}
        >
          <MessageList messages={messages} />
          <div ref={messagesEndRef} />
          {isLoading && (
            <div style={{ textAlign: 'center', padding: '16px' }}>
              <Spin tip="AI 正在思考..." />
            </div>
          )}
        </div>
        <InputArea onSend={handleSendMessage} isLoading={isLoading} />
      </Content>
    </Layout>
  );
};
