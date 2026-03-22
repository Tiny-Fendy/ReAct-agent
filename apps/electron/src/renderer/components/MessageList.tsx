import React from 'react';
import { List, Avatar, Typography } from 'antd';
import type { Message } from '../../types';

const { Text } = Typography;

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={messages}
      renderItem={(item) => (
        <List.Item style={{ padding: '16px 24px' }}>
          <List.Item.Meta
            avatar={
              <Avatar
                style={{
                  backgroundColor: item.role === 'user' ? '#1890ff' : '#52c41a',
                }}
              >
                {item.role === 'user' ? 'U' : 'AI'}
              </Avatar>
            }
            title={
              <Text strong style={{ color: item.role === 'user' ? '#1890ff' : '#52c41a' }}>
                {item.role === 'user' ? '你' : 'AI 助手'}
              </Text>
            }
            description={
              <div style={{ marginTop: '8px', lineHeight: '1.6' }}>
                {item.content}
              </div>
            }
          />
        </List.Item>
      )}
    />
  );
};
