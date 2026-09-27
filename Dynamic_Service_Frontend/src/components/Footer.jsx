import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">Dynamic Service</div>
          <p>Beautiful decoration, professional ceremony animation, sound equipment and reliable event rentals.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <Link to="/">Home</Link><Link to="/services">Services</Link><Link to="/gallery">Gallery</Link><Link to="/about">About Us</Link><Link to="/contact">Contact</Link>
        </div>
        <div>
          <h4>Our Services</h4>
          <span>Event Decoration</span><span>Ceremony Animation</span><span>Sound & Lighting</span><span>Equipment Rental</span>
        </div>
        <div>
          <h4>Contact</h4>
          <span>📍 Kigali, Rwanda</span><span>📞 +256 773 837  </span><span>📞 +250 793 881 000 </span><span>📞 +250 732 616 390</span><span>✉️ info@dynamicservice.rw</span><span>🕒 Mon–Sun: 8AM–8PM</span>
        </div>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} Dynamic Service. All rights reserved.-Powered by JONATHAN MUNGO</div>
    </footer>
  );
}
