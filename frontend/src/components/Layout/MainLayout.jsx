import Header from "./Header.jsx";

function MainLayout({userInfo, onLogout }) {
    return (
        <div className="home-container">
            <Header userInfo={userInfo} onLogout={onLogout} />

            <div className="main-content">
                <h1>Welcome, {userInfo?.name || 'User'}</h1>

            </div>
        </div>
    );
}

export default MainLayout;