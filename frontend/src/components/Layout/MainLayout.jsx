import Header from "./Header.jsx";
import {Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";

function MainLayout({userInfo, onLogout }) {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* 顶部用户信息栏 */}
                <Header userInfo={userInfo} onLogout={onLogout}/>

                {/* 主内容区 */}
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet/>
                </main>
            </div>

        </div>
    );
}

export default MainLayout;