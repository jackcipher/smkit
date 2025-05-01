import { useState } from 'react';
import {Me} from '../wailsjs/go/main/App.js'

function LoginPage({ onLogin }) {
    const [token, setToken] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => { // Use async/await for cleaner async handling
        e.preventDefault();
        setIsLoading(true);
        setError(''); // Clear previous errors on new attempt

        try {
            // Await the promise returned by Me
            // Assuming Me returns the user info object directly on success
            const userInfo = await Me(token);

            console.log("[go] api request ok", userInfo);

            // Call the parent's onLogin function with token and user info
            // The parent (App.js) is responsible for storing this in localStorage
            // using the utility functions.
            onLogin(token, userInfo);

        } catch (err) {
            // Handle errors from the Me call
            console.error("go-api error", err);
            // Set the error state with the error message
            // Wails errors from Go might be strings or objects, attempt to get a message
            setError(typeof err === 'string' ? err : err.message || '认证失败');
        } finally {
            // This block runs after try or catch, regardless of success or failure
            setIsLoading(false);
        }
    };

    return (
        // Main container: Center, max width, padding, background, rounded corners, shadow
        <div className="dragable max-w-md mx-auto mt-10 p-6 ">
            {/* Heading: Large text, bold, centered, bottom margin */}
            <h1 className="text-2xl font-bold text-center mb-6">获取 SID</h1> {/* Updated text */}

            <form onSubmit={handleSubmit} className="space-y-4"> {/* space-y-4 adds vertical space between direct children */}
                {/* Form Group: Removed custom class, handled by form's space-y */}
                <div>
                    {/* Label: Block display, text color, font weight, bottom margin */}
                    <label htmlFor="token" className="block text-gray-700 text-sm font-medium mb-2">请输入石墨文档的 shimo_sid:</label> {/* Updated text */}

                    {/* Input: Shadow, appearance, border, rounded, full width, padding, text color, focus states */}
                    <input
                        type="text"
                        id="token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        required
                        className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Error Message: Text color (red), text size, top margin */}
                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

                {/* Button: Full width, background, text color, bold, padding, rounded, hover, focus, disabled states */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 ease-in-out"
                >
                    {isLoading ? '认证中...' : '登录'} {/* Updated text */}
                </button>
            </form>
        </div>
    );
}

export default LoginPage;