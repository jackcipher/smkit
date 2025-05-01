import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as LucidIcons from 'lucide-react';
import {routerConfig} from "../../routes.js";


const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(true);

    // 根据字符串加载 icon
    const renderIcon = (iconName) => {
        const Icon = LucidIcons[iconName];
        return Icon ? <Icon /> : null;
    };

    return (
        <div className={`bg-gray-800 pt-10 text-white min-h-screen transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
            <div className="mt-6">
                {routerConfig.map((item)=>(
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
                        <div className="flex-shrink-0">{renderIcon(item.icon)}</div>
                        {!collapsed && <span>{item.label}</span>}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;