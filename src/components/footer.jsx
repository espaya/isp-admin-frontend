export default function Footer() {
  return (
    <>
      <footer className="main-footer">
        <div className="footer-bottom">
          <div className="auto-container">
            <div className="main-footer_copyright">
              Copyright {new Date().getFullYear()}. Developed by{" "}
              <a href="#">techdex</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
