import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ConfigProvider } from 'antd';
import './dark-theme.css';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <ConfigProvider
        theme={{
            token: {
                colorPrimary: "#612EC9",
                colorBgContainer: "#2a2a2a",
                colorText: "#f5f5f5",
                colorBorder: "#434343",
                borderRadius: 8,
                boxShadow: "tranparent",
                colorBgElevated: "#29292E",
                colorTextHeading: "#ffffff",
                colorBorderSecondary: "#595959",
                colorTextPlaceholder: "#E1E1E6",
                colorIcon: "#f5f5f5",
                colorIconHover: "#612EC9",
            }
        }}>
        <App />
    </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
