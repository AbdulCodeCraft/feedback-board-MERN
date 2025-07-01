import React from 'react';
import ReactDOM from 'react-dom/client';
// You were importing useAuth, but you need to import AuthProvider here for JSX
import { AuthProvider } from './context/AuthContext.jsx'; // CORRECTED: Import AuthProvider (named export)
import App from './App.jsx';
import './index.css'; // Your main CSS file with Tailwind directives
import { BrowserRouter } from 'react-router-dom'; // NEW: Import BrowserRouter

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* NEW: Wrap the App component with BrowserRouter */}
    <BrowserRouter>
      <AuthProvider> {/* Ensure App is wrapped with AuthProvider */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);