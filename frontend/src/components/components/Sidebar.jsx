import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HardDrive, Download, Settings, ChevronRight, ChevronLeft } from 'lucide-react';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const menuItems = [
        {
            path: '/',
            name: '网盘文件',
            icon: <HardDrive />
        },
        {
            path: '/downloads',
            name: '下载管理',
            icon: <Download />
        },
        {
            path: '/settings',
            name: '全局设置',
            icon: <Settings />
        }
    ];

    return (
        <div className={`bg-gray-800 pt-10 text-white min-h-screen transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
            {/*<div className="flex justify-between items-center p-4 border-b border-gray-700">*/}
            {/*    <h2 className={`font-bold text-xl ${collapsed ? 'hidden' : 'block'}`}>我的云盘</h2>*/}
            {/*    <button*/}
            {/*        onClick={toggleSidebar}*/}
            {/*        className="p-2 rounded-full hover:bg-gray-700 transition-colors"*/}
            {/*    >*/}
            {/*        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}*/}
            {/*    </button>*/}
            {/*</div>*/}

            <div className="mt-6">
                {menuItems.map((item) => (
                    <NavLink
                        to={item.path}
                        key={item.path}
                        className={({ isActive }) =>
                            `flex items-center py-3 px-4 ${
                                isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                            } transition-colors ${
                                collapsed ? 'justify-center' : 'space-x-3'
                            }`
                        }
                    >
                        <div className="flex-shrink-0">{item.icon}</div>
                        {!collapsed && <span>{item.name}</span>}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;