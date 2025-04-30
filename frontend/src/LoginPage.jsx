import { useState } from 'react';
import {Me} from '../wailsjs/go/main/App.js'

function LoginPage({ onLogin }) {
    const [token, setToken] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');


        try {
            Me(token).then((userInfo)=>{
                console.log("[go] api request ok")
                console.log(userInfo)
                onLogin(token,userInfo)
            },(err)=>{
                console.log("go-api error",err)
                setError(err)
            })
        } catch (err) {
            console.log("go-api error",err)
            setError(err)
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="token">Authentication Token:</label>
                    <input
                        type="text"
                        id="token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Validating...' : 'Login'}
                </button>
            </form>
        </div>
    );
}

export default LoginPage;