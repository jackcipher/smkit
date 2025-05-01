// src/App.js
import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {Me} from '../wailsjs/go/main/App.js'; // <-- 保持不变
// 导入我们创建的 localStorage 工具函数
import {clearAuthStorage, getAuthToken, getUserInfo, setAuthToken, setUserInfo} from './utils/localStorage';

import LoginPage from './LoginPage';
import MainLayout from "./components/Layout/MainLayout.jsx";
import {SetLoginWindow} from "./utils/window.js";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfoState] = useState(null); // Renamed state variable to avoid conflict

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // 使用工具函数获取 token 和用户信息
                const token = getAuthToken();
                const localUserInfo = getUserInfo(); // Get parsed user info

                if (localUserInfo) {
                    // If user info exists locally (from a previous successful login),
                    // set state immediately for a snappier feel while validating token
                    setUserInfoState(localUserInfo);
                }

                if (!token) {
                    // No token means not authenticated
                    setIsAuthenticated(false);
                    setIsLoading(false);
                    return;
                }

                // --- KEEPING THE ME CALL ---
                // Call the Go backend to validate the token and get the latest user info
                Me(token).then((fetchedUserInfo) => {
                    // Assuming Me returns the actual user object/struct after successful validation
                    setUserInfoState(fetchedUserInfo); // Update state with info from backend
                    setUserInfo(fetchedUserInfo); // Store the fresh info back to localStorage (utility handles stringify)
                    setIsAuthenticated(true);
                }, (err) => {
                    // Me call failed (e.g., invalid token, expired, network error)
                    console.error('[Go] Authentication error:', err);
                    clearAuthStorage(); // Clear stored token and user info
                    setUserInfoState(null);
                    setIsAuthenticated(false);
                });

            } catch (err) {
                // Catch errors from getAuthToken, getUserInfo or the promise setup itself
                console.error('Client-side authentication check error:', err);
                clearAuthStorage(); // Ensure storage is clear on any check error
                setUserInfoState(null);
                setIsAuthenticated(false);
            } finally {
                // Ensure loading state is turned off after the check logic completes
                // Need to use a slightly different approach if Me is async and doesn't resolve/reject immediately
                // If Me is truly promise-based, this finally is fine.
                // If Me is a standard Go function call that *might* block or call callbacks,
                // the isLoading logic around it might need adjustment depending on its exact behavior.
                // Assuming Me returns a Promise for now based on .then/.catch usage.
                setIsLoading(false);
            }
        };

        checkAuth();

        // Consider adding token or isAuthenticated as a dependency if you want
        // this effect to re-run when those change, though typically it runs once on mount
        // to check initial state. Authentication state changes are usually handled
        // by calling handleLogin/handleLogout which update state directly.
    }, []); // Empty dependency array means this runs only once on mount

    const handleLogin = (token, fetchedUserInfo) => {
        // Use utility functions to set token and user info
        setAuthToken(token);
        setUserInfo(fetchedUserInfo); // Utility handles stringifying
        setUserInfoState(fetchedUserInfo); // Update state
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        // Use utility function to clear storage
        SetLoginWindow();
        clearAuthStorage();
        setUserInfoState(null); // Update state
        setIsAuthenticated(false);
    };

    // Basic Loading indicator
    if (isLoading) {
        // You could potentially use the locally stored userInfo here to show
        // a personalized loading screen if needed, before validation completes.
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center text-gray-600">
                    {/* Add a spinner or better loading UI if desired */}
                    <svg className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg"
                         fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
                    </svg>
                    Loading...
                </div>
            </div>
        );
    }

    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={
                        isAuthenticated ?
                            <Navigate to="/" replace/> :
                            <LoginPage onLogin={handleLogin}/>
                    }
                />
                <Route
                    path="/"
                    element={
                        isAuthenticated ?
                            <MainLayout userInfo={userInfo} onLogout={handleLogout}/> :
                            <Navigate to="/login" replace/>
                    }
                >
                    <Route path="/" element={<div>home</div>}/>
                    <Route path="/downloads" element={<div>downloads</div>}/>
                    <Route path="/settings" element={<div>setting</div>}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;