import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { TaskProvider } from './context/TaskContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import TaskDetails from './pages/TaskDetails';
import TaskForm from './pages/TaskForm';
import Login from './pages/Login';
import './App.css';


const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN || ''}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID || ''}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <TaskProvider>
        <Router>
          <div className="app">
            <Navbar />
            <main className="container mt-4">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/tasks/:id"
                  element={
                    <PrivateRoute>
                      <TaskDetails />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/tasks/new"
                  element={
                    <PrivateRoute>
                      <TaskForm />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/tasks/:id/edit"
                  element={
                    <PrivateRoute>
                      <TaskForm />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </main>
          </div>
        </Router>
      </TaskProvider>
    </Auth0Provider>
  );
}

export default App;
