function NavBar({ children, tabs, size, setActiveTab }) {
  return (
    <div className="p-4">
      {/* Navigation Bar */}

      <nav className="flex justify-center space-x-4 mb-4 border-b pb-2">
        {tabs.map((tab) => {
          return (
            <button
              onClick={() => setActiveTab(tab.content)}
              className={`px-4 py-2 rounded-md ${
                children?.type === tab.content.type
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
      {/* Display Active Tab */}
      {children}
    </div>
  );
}
export default NavBar;
