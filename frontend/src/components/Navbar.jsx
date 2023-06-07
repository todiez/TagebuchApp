import React from "react";
import { UserContext } from "../context/context";

export default function Navbar() {
  return (
    <UserContext.Consumer>
      {({ isLoggedIn }) => (
        <nav class="navbar bg-dark border-bottom border-bottom-dark" data-bs-theme="dark">
        <a class="navbar-brand" href="/">
          Tagebuch
        </a>
        <div class="container-fluid">
          <ul class="navbar-nav flex-row">
            <li class="nav-item">
              <a class="nav-link mx-2" href="/createaccount/">
                Create Account
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link mx-2" href="/login/">
                Login
              </a>
            </li>
            {isLoggedIn && (
              <li class="nav-item">
                <a class="nav-link mx-2" href="/logout/">
                  Logout
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
      
      
      )}
    </UserContext.Consumer>
  );
}
