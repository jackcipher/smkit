import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {Me} from '../wailsjs/go/main/App.js'
import LoginPage from './LoginPage';
import HomePage from './HomePage';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('authToken');

                const localUserInfo = localStorage.getItem('userInfo')
                if (localUserInfo) {
                    setUserInfo(JSON.parse(localUserInfo))
                }

                if (!token) {
                    setIsAuthenticated(false);
                    setIsLoading(false);
                    return;
                }

                Me(token).then((userInfo)=>{
                    setIsAuthenticated(true);
                    localStorage.setItem('userInfo', userInfo);
                },(err)=>{
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('userInfo');
                    setIsAuthenticated(false);
                })
            } catch (err) {
                console.error('[Go]Authentication error:', err);
                localStorage.removeItem('authToken');
                localStorage.removeItem('userInfo');
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const handleLogin = (token,userInfo) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userInfo',JSON.stringify(userInfo));
        setUserInfo(userInfo)
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userInfo');
        setUserInfo(null);
        setIsAuthenticated(false);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={
                        isAuthenticated ?
                            <Navigate to="/" replace /> :
                            <LoginPage onLogin={handleLogin} />
                    }
                />
                <Route
                    path="/"
                    element={
                        isAuthenticated ?
                            <HomePage userInfo={userInfo} onLogout={handleLogout} /> :
                            <Navigate to="/login" replace />
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;