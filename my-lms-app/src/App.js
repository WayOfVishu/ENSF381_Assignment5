import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/LoginForm'; 

import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import LoginForm from './pages/LoginPage';

function App() {
  return (
    <div className="App">
            <BrowserRouter>
            <AuthProvider>
                <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/courses" element={<CoursePage />} />

                <Route path="/login" element={<LoginForm />} />

                </Routes>
              </AuthProvider>
            </BrowserRouter>
    </div>
  );
}

export default App;