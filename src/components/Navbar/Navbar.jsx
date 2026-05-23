import { useState } from "react";
import "./navbar.css";

function Navbar() {
  // State to manage sidebar visibility toggle
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // State to manage dropdown menu visibility for create/join classroom
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Toggle dropdown menu for create/join classroom options
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Handle create classroom action
  const handleCreateClassroom = () => {
    console.log("Create classroom clicked");
    setDropdownOpen(false);
    // Add navigation or modal logic here
  };

  // Handle join classroom action
  const handleJoinClassroom = () => {
    console.log("Join classroom clicked");
    setDropdownOpen(false);
    // Add navigation or modal logic here
  };

  return (
    <nav className="navbar">
      {/* LEFT SIDE: Hamburger menu icon and Classroom branding */}
      <div className="navbar-left">
        {/* Hamburger menu icon - 3 horizontal lines that toggle sidebar */}
        <button
          className="hamburger-btn"
          onClick={toggleSidebar}
          title="Toggle sidebar"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Classroom branding text */}
        <div className="navbar-brand">
          <h1>Classroom</h1>
        </div>
      </div>

      {/* RIGHT SIDE: Profile icon and Create/Join dropdown */}
      <div className="navbar-right">
        {/* Plus icon with dropdown menu */}
        <div className="dropdown-container">
          <button
            className="plus-btn"
            onClick={toggleDropdown}
            title="Create or join classroom"
          >
            <span className="plus-icon">+</span>
          </button>

          {/* Dropdown menu for create/join options */}
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={handleCreateClassroom}>
                ✏️ Create a classroom
              </button>
              <button className="dropdown-item" onClick={handleJoinClassroom}>
                ➕ Join a classroom
              </button>
            </div>
          )}
        </div>

        {/* Profile icon */}
        <button className="profile-btn" title="Profile">
          <span className="profile-icon">👤</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
