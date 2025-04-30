const AUTH_TOKEN_KEY = 'authToken';
const USER_INFO_KEY = 'userInfo';

/**
 * 获取存储在 localStorage 中的认证 token
 * @returns {string | null} 返回 token 字符串或 null (如果不存在)
 */
export const getAuthToken = () => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
};

/**
 * 将认证 token 存储到 localStorage
 * @param {string} token 要存储的 token 字符串
 */
export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
    } else {
        // If token is null or undefined, remove it
        removeAuthToken();
    }
};

/**
 * 从 localStorage 中移除认证 token
 */
export const removeAuthToken = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
};

/**
 * 获取存储在 localStorage 中的用户信息
 * @returns {object | null} 返回解析后的用户信息对象或 null (如果不存在或解析失败)
 */
export const getUserInfo = () => {
    const userInfoString = localStorage.getItem(USER_INFO_KEY);
    if (!userInfoString) {
        return null;
    }
    try {
        return JSON.parse(userInfoString);
    } catch (e) {
        console.error("Failed to parse user info from localStorage", e);
        // If parsing fails, clear potentially corrupted data
        removeUserInfo();
        return null;
    }
};

/**
 * 将用户信息存储到 localStorage
 * @param {object} userInfo 要存储的用户信息对象
 */
export const setUserInfo = (userInfo) => {
    if (userInfo) {
        try {
            localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
        } catch (e) {
            console.error("Failed to stringify user info for localStorage", e);
        }
    } else {
        // If userInfo is null or undefined, remove it
        removeUserInfo();
    }
};

/**
 * 从 localStorage 中移除用户信息
 */
export const removeUserInfo = () => {
    localStorage.removeItem(USER_INFO_KEY);
};

/**
 * 清除所有与认证相关的 localStorage 数据 (token 和用户信息)
 */
export const clearAuthStorage = () => {
    removeAuthToken();
    removeUserInfo();
};