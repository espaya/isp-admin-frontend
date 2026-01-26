import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/header";

export default function Login() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <>
      <title>Novanet - Login</title>
      <div className="page-wrapper">
        <Header />

        <section
          className="page-title_two"
          style={{ backgroundImage: "url(images/background/page-title-2.jpg)" }}
        >
          <div
            className="page-title_two-gradient"
            style={{ backgroundImage: "url(images/background/pattern-6.png)" }}
          />
          <div className="auto-container">
            <h2>Login</h2>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="index.html">Home</a>
              </li>
              <li>Login</li>
            </ul>
          </div>
        </section>

        <section className="register-one">
          <div className="auto-container">
            {/* Tabs */}
            <div className="tabs mb-4">
              <ul
                className="tab-buttons d-flex justify-content-center list-unstyled"
                style={{ gap: "1rem", padding: 0 }}
              >
                <li
                  onClick={() => setActiveTab("login")}
                  style={{
                    cursor: "pointer",
                    padding: "0.5rem 1.5rem",
                    borderRadius: "25px",
                    border:
                      activeTab === "login"
                        ? "2px solid #0d6efd"
                        : "2px solid #ccc",
                    backgroundColor:
                      activeTab === "login" ? "#0d6efd" : "#f8f9fa",
                    color: activeTab === "login" ? "white" : "#333",
                    fontWeight: activeTab === "login" ? "600" : "500",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== "login")
                      e.currentTarget.style.backgroundColor = "#e2e6ea";
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== "login")
                      e.currentTarget.style.backgroundColor = "#f8f9fa";
                  }}
                >
                  Login
                </li>
                <li
                  onClick={() => setActiveTab("register")}
                  style={{
                    cursor: "pointer",
                    padding: "0.5rem 1.5rem",
                    borderRadius: "25px",
                    border:
                      activeTab === "register"
                        ? "2px solid #0d6efd"
                        : "2px solid #ccc",
                    backgroundColor:
                      activeTab === "register" ? "#0d6efd" : "#f8f9fa",
                    color: activeTab === "register" ? "white" : "#333",
                    fontWeight: activeTab === "register" ? "600" : "500",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== "register")
                      e.currentTarget.style.backgroundColor = "#e2e6ea";
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== "register")
                      e.currentTarget.style.backgroundColor = "#f8f9fa";
                  }}
                >
                  Register
                </li>
              </ul>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                  
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <div className="scroll-to-top scroll-to-target" data-target="html">
        <span className="fas fa-arrow-up fa-fw" />
      </div>
    </>
  );
}
