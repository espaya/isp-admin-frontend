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
        <section className="register-one">
          <div className="auto-container">
            <div className="tab-content">
              <LoginForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
