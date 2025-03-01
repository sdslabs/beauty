"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Timer from "@/lib/components/Timer";
import { dropdown } from "@/lib/constants/images";
import { authService } from "../api/services/auth";
import useStore from "../store/useStore";
import { useThemeStore } from "../store/themeStore";
import { Moon, Sun } from "lucide-react"; 

const Navbar = () => {
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated } = useStore();
  const { isDarkTheme, toggleTheme } = useThemeStore();

  const userLinks = [
    { text: "Challenges", page: "/challenges" },
    { text: "Leaderboard", page: "/leaderboard" },
    { text: "Notifications", page: "/notifications" },
    { text: "AboutCTF", page: "/about" },
  ];

  const adminLinks = [
    { text: "Statistics", page: "/admin/statistics" },
    { text: "Notifications", page: "/admin/notifications" },
    { text: "Users", page: "/admin/users" },
    { text: "Leaderboard", page: "/admin/leaderboard" },
    { text: "Challenges", page: "/admin/challenges" },
    { text: "Submissions", page: "/admin/submissions" },
    { text: "Configure", page: "/admin/configure" },
  ];

  const links = user?.role === "admin" ? adminLinks : userLinks;
  const userProfilePath = `/user/${user?.username}`;

  const logout = () => {
    authService.logout();
    window.location.href = "/login";
  };

  return (
    <nav
      className={`w-full py-4 px-6 shadow-md flex items-center justify-between ${
        isDarkTheme ? "bg-black text-[#a5a5a5]" : "bg-white text-black"
      }`}
    >
      <Link href="/" className="text-lg font-bold">playCTF</Link>
      {isAuthenticated ? (
        <div className="flex items-center gap-6">
          <div className="flex gap-6">
            {links.map((route, index) => (
              <Link
                key={index}
                href={route.page}
                className={`text-sm hover:font-semibold transition ${
                  pathname === route.page ? "font-bold border-b-2 border-[#e44f26]" : ""
                }`}
              >
                {route.text}
              </Link>
            ))}
          </div>

          {/* Timer */}
          <div className="flex flex-col items-center">
            <p className="text-xs text-gray-600">Time Remaining</p>
            <Timer />
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div
            className="relative"
            onMouseEnter={() => setDisplayDropdown(true)}
            onMouseLeave={() => setDisplayDropdown(false)}
          >
            <button className="flex items-center gap-2 font-medium">
              {user?.username}
              <img src={dropdown} alt="dropdown" className="h-4 w-4" />
            </button>
            {displayDropdown && (
              <div className="absolute right-0 mt-2 w-40 shadow-lg rounded-md py-2 flex flex-col bg-white dark:bg-gray-800">
                {user?.role !== "admin" && (
                  <>
                    <Link
                      href={userProfilePath}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/resetpassword"
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                    >
                      Change Password
                    </Link>
                  </>
                )}
                <button
                  onClick={logout}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <p className="text-sm text-gray-600">Already Registered?</p>
          <Link href="/login" className="text-[#e44f26] font-semibold text-sm">
            LOG IN
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;