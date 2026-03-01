
import LoginForm from "../components/auth/loginForm";

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
