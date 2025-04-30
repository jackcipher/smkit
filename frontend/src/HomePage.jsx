import './home-page.css'
import {useEffect, useRef, useState} from "react";
import Header from "./components/Header.jsx";
function HomePage({userInfo, onLogout }) {
    // const [menuOpen, setMenuOpen] = useState(false);
    // const menuRef = useRef(null);
    //
    // const toggleMenu = () => setMenuOpen(!menuOpen);
    //
    // useEffect(() => {
    //     console.log("userInfo.home")
    //     const handleClickOutside = (event) => {
    //         if (menuRef.current && !menuRef.current.contains(event.target)) {
    //             setMenuOpen(false);
    //         }
    //     };
    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, []);

    return (
        <div className="home-container">
            <Header userInfo={userInfo} onLogout={onLogout} />
            {/*<div className="header">*/}
            {/*    <div className="user-menu" ref={menuRef}>*/}
            {/*        <div className="user-summary" onClick={toggleMenu}>*/}
            {/*            <span className="username">{userInfo?.name || 'User'}</span>*/}
            {/*        </div>*/}
            {/*        {menuOpen && (*/}
            {/*            <div className="dropdown-menu">*/}
            {/*                <button onClick={onLogout}>Logout</button>*/}
            {/*            </div>*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="main-content">
                <h1>Welcome, {userInfo?.name || 'User'}</h1>

            </div>
        </div>
    );


}

export default HomePage;