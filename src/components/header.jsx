import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <header className="main-header header-style-one">
        <div className="header-lower">
          <div className="auto-container">
            <div className="inner-container d-flex align-items-center justify-content-between">
              {/* Logo Box */}
              <div className="logo-box d-flex align-items-center">
                <div className="logo">
                  <Link to="/">
                    <img src="images/logo.png" alt="" title="" />
                  </Link>
                </div>
              </div>
              <div className="nav-outer d-flex align-items-center">
                {/* Main Menu */}
                <nav className="main-menu show navbar-expand-md">
                  <div className="navbar-header">
                    <button
                      className="navbar-toggler"
                      type="button"
                      data-toggle="collapse"
                      data-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="icon-bar" />
                      <span className="icon-bar" />
                      <span className="icon-bar" />
                    </button>
                  </div>
                  <div
                    className="navbar-collapse scroll-nav collapse clearfix"
                    id="navbarSupportedContent"
                  >
                    <ul className="navigation clearfix">
                      <li className="current">
                        <NavLink
                          to="/#home"
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/#about"
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          About us
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/#price"
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          Price
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/#benefits"
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          Benefits
                        </NavLink>
                      </li>
                      <li>
                        {user ? (
                          <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                              isActive ? "active" : ""
                            }
                          >
                            <i className="fas fa-user me-2"></i> Dashboard
                          </NavLink>
                        ) : (
                          <NavLink
                            to="/login"
                            className={({ isActive }) =>
                              isActive ? "active" : ""
                            }
                          >
                            Login / Register
                          </NavLink>
                        )}
                      </li>
                    </ul>
                  </div>
                </nav>
                {/* Main Menu End*/}
              </div>
              {/* Outer Box */}
              <div className="outer-box d-flex align-items-center">
                <div className="header-phone_box">
                  <div className="header-phone_box-inner">
                    <div className="header-phone_box-icon flaticon-consulting" />
                    Help line <br />
                    <a href="tel:+66-7800-3202">+66(7800) 3202</a>
                  </div>
                </div>
                {/* Mobile Navigation Toggler */}
                <div className="mobile-nav-toggler">
                  <span className="icon">
                    <img src="images/icons/menu.png" alt="" />
                  </span>
                </div>
              </div>
              {/* End Outer Box */}
            </div>
          </div>
        </div>
        {/* End Header Lower */}
        {/* Mobile Menu  */}
        <div className="mobile-menu">
          <div className="menu-backdrop" />
          <div className="close-btn">
            <span className="icon far fa-times fa-fw" />
          </div>
          <nav className="menu-box">
            <div className="nav-logo">
              <Link to="/">
                <img src="images/logo.png" alt="" title="" />
              </Link>
            </div>
            {/* Search */}
            <div className="menu-outer">
              {/*Here Menu Will Come Automatically Via Javascript / Same Menu as in Header*/}
            </div>
          </nav>
        </div>
        {/* End Mobile Menu */}
      </header>
    </>
  );
}
