import React, { useEffect, useState } from "react";

function NavBar({ tabs, style }) {
  const [activeTab, setActiveTab] = useState(tabs[0].content);

  const handleTabClick = (tabContent) => {
    setActiveTab(tabContent);
  };

  useEffect(() => {
    setActiveTab(tabs[0].content);
  }, [tabs]);

  return (
    <div className="p-4">
      <nav className="flex justify-center space-x-4 mb-4 border-b pb-2">
        {tabs.map((tab) => {
          return (
            <button
              onClick={() => handleTabClick(tab.content)}
              className={
                style
                  ? style
                  : `px-4 py-2 rounded-md ${
                      activeTab === tab.content
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`
              }
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
      {activeTab}
    </div>
  );
}
export default NavBar;
