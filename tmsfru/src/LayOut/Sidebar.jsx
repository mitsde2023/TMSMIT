import React, { useState } from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showSubMenu, setShowSubMenu] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  return (
    <aside
      className={`bg-gray-800 text-white ${
        isOpen ? "w-48" : "w-12"
      } transition-width duration-300 ease-in-out`}
    >
      <div className="flex justify-between border-b items-center py-2 px-3">
        <button onClick={toggleSidebar} className="text-white text-xl">
          {isOpen ? (
            <i class="bi bi-arrow-left-square"></i>
          ) : (
            <i class="bi bi-arrow-right-square"></i>
          )}
        </button>
      </div>

      {isOpen ? (
        <>
          <nav className="h-full">
            <Link
              to="/user/dashboard/Home"
              className="block py-2 px-3 text-sm text-base"
            >
              <i class="bi bi-house fs-2 "></i> Home
            </Link>
            <Link
              to="/user/dashboard/Ticket"
              className="block py-2 px-3 text-sm text-base"
            >
              <i class="bi bi-ticket"></i> Ticket
            </Link>

            <div
              className="block py-2 px-3 text-sm text-base"
              onClick={toggleSubMenu}
              style={{ cursor: "pointer" }}
            >
              <i className="bi bi-house fs-2"></i> Menu
            </div>

            {showSubMenu && (
              <div className="ml-4">
                <Link
                  to="/user/dashboard/Ticket"
                  className="block py-2 px-4 text-sm"
                >
                  <i className="bi bi-ticket"></i> Ticket1
                </Link>
                <Link
                  to="/user/dashboard/Ticket"
                  className="block py-2 px-4 text-sm"
                >
                  <i className="bi bi-ticket"></i> Ticket2
                </Link>
              </div>
            )}
          </nav>
        </>
      ) : (
        <>
          <nav className="h-full">
            <Link
              to="/user/dashboard/Home"
              className="block py-2 px-3 text-sm text-xl"
            >
              <i class="bi bi-house"></i>
            </Link>
            <Link
              to="/user/dashboard/Ticket"
              className="block py-2 px-3 text-sm text-xl"
            >
              <i class="bi bi-ticket"></i>
            </Link>
            <div
              className="block py-2 px-3 text-sm text-base"
              onClick={toggleSubMenu}
              style={{ cursor: "pointer" }}
            >
              <i class="bi bi-caret-down"></i>
            </div>

            {showSubMenu && (
              <div className="ml-4">
                <Link
                  to="/user/dashboard/Ticket"
                  className="block py-2 px-2 text-sm"
                >
                  <i className="bi bi-ticket"></i>
                </Link>
                <Link
                  to="/user/dashboard/Ticket"
                  className="block py-2 px-2 text-sm"
                >
                  <i className="bi bi-ticket"></i>
                </Link>
              </div>
            )}
          </nav>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
