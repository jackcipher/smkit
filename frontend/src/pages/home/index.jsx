import { useState, useEffect } from "react";
import { ChevronDown } from 'lucide-react';

export default () => {
    // 当前选中的标签索引
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    // 标签内容
    const [content, setContent] = useState('');
    // 加载状态
    const [loading, setLoading] = useState(false);

    const tabList = [{
        label: "我的桌面",
        guid: "abc",
        isSpace: false,
    }, {
        label: "团队空间",
        guid: "efg",
        isSpace: true,
    }];

    // 模拟从后端获取数据的函数
    const fetchTabContent = async (tabIndex) => {
        setLoading(true);

        try {
            // 这里是模拟API请求，实际使用时替换为真实API调用
            // 例如: const response = await fetch(`/api/tabs/${tabList[tabIndex].guid}`);

            // 模拟请求延迟
            await new Promise(resolve => setTimeout(resolve, 500));

            // 模拟数据
            const tabContents = {
                0: '这是"我的桌面"标签页的内容。内容已在点击时刷新。',
                1: '这是"团队空间"标签页的内容。内容已在点击时刷新。',
            };

            setContent(tabContents[tabIndex]);
        } catch (error) {
            console.error('获取标签内容失败:', error);
            setContent('加载内容失败，请重试。');
        } finally {
            setLoading(false);
        }
    };

    // 处理标签点击
    const handleTabClick = (tabIndex) => {
        setActiveTabIndex(tabIndex);
        // 点击标签时刷新内容
        fetchTabContent(tabIndex);
    };

    // 组件挂载时加载初始标签内容
    useEffect(() => {
        fetchTabContent(activeTabIndex);
    }, []);

    return (
        <div className="w-full mx-auto">
            <div className="flex border-b border-gray-200">
                {/* 标签按钮 */}
                {tabList.map((element, index) => (
                    <div key={index} className="relative">
                        <div className="flex items-center">
                            <button
                                onClick={() => handleTabClick(index)}
                                className={`cursor-pointer px-4 py-2 font-medium text-sm ${
                                    activeTabIndex === index
                                        ? 'text-blue-600 border-b-2 border-blue-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {element.label}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* 标签内容区域 */}
            <div className="mt-4 p-4 border rounded-md bg-gray-50">
                {loading ? (
                    <div className="flex justify-center items-center h-20">
                        <div className="text-gray-500">加载中...</div>
                    </div>
                ) : (
                    <div>{content}</div>
                )}
            </div>
        </div>
    );
}