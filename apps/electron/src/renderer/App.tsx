import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { ChatWindow } from './components/ChatWindow';
import './styles/index.css';

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <ChatWindow />
    </ConfigProvider>
  );
};

export default App;
