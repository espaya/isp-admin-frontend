import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/header";
import LoginForm from "../components/auth/loginForm";
import { Link } from "react-router-dom";

export default function Login() {

  return (
    <>
      <title>Novanet - Login</title>
      <div className="page-wrapper">
        {/* <Header /> */}

        {/* <section
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
                <Link to="/">Home</Link>
              </li>
              <li>Login</li>
            </ul>
          </div>
        </section> */}

        <section className="register-one">
          <div className="auto-container">
            {/* Tab Content */}
            <div className="tab-content">
                  <LoginForm/>
            </div>
          </div>
        </section>

        {/* <Footer /> */}
      </div>
{/* 
      <div className="scroll-to-top scroll-to-target" data-target="html">
        <span className="fas fa-arrow-up fa-fw" />
      </div> */}
    </>
  );
}
