import React from "react";
import { useAuth } from "../../context/Authcontext"; // make sure path is correct

function Header() {
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <header>
      <div className="header">
        <div className="Headerleft">
          <img
            src={user?.profilePic || "/avatar.jpg"}
            className="avatar"
            alt="Profile"
          />
          <h2>{user?.username || "Guest"}</h2>
        </div>
        <div className="Headercenter">
          <img src="/logo1.png" className="headerimg" alt="Logo" />
        </div>
        <div className="Headerright">
          {isLoggedIn ? (
            <button className="Logoutbuttn" onClick={logout}>
              Logout
            </button>
          ) : (
            <button className="Loginbuttn" onClick={() => window.location.href = "/login"}>
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
