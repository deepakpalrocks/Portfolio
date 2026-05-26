import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <span className="footer__logo">
            <span className="footer__bracket">{'{'}</span>DP<span className="footer__bracket">{'}'}</span>
          </span>
          <span className="footer__text">Designed & Built by Deepak Pal</span>
        </div>
      </div>
    </footer>
  );
}
