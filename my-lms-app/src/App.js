import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/LoginForm'; 

import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import LoginForm from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
            <BrowserRouter>
            <AuthProvider>
                <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/courses" element={<CoursePage />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                </Routes>
              </AuthProvider>
            </BrowserRouter>
    </div>
  );
}

export default App;