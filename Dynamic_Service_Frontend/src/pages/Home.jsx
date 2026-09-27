import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';

const services = [
  {image:'/images/Animation2.jpg', icon:'✦', title:'Event Decoration', text:'Elegant themes, tables, flowers, backdrops and complete venue styling for memorable ceremonies.'},
  {image:'/images/dd.jpg', icon:'🎤', title:'Ceremony Animation', text:'Professional MC, entertainment, program coordination and audience engagement for your celebration.'},
  {image:'/images/sound.jpg', icon:'♫', title:'Sound & Lighting', text:'Clear sound, microphones, speakers, DJ support and atmospheric lighting for indoor and outdoor events.'}
];

export default function Home() {
  return <>
    <section className="hero">
      <div className="hero-overlay" />
      <div className="container hero-content">
        <p className="eyebrow">CELEBRATION • DECORATION • CREATIVITE</p>
        <h1>Bienvenue Chez DYNAMIC SERVICE </h1>
        <h2><em>Chez Nous c'est la Beaute memorile.</em></h2>
        <p className="hero-text">Dynamic Service provides decoration, ceremony animation, sound equipment and event rentals for weddings, birthdays, conferences and celebrations.</p>
        <div className="hero-actions"><Link to="/book" className="btn btn-primary">Book Your Event</Link><Link to="/services" className="btn btn-light">Explore Services</Link></div>
      </div>
    </section>

    <section className="feature-strip">
      <div className="container feature-grid">
        <div><span>✦</span><div><h3>Creative Design</h3><p>Decoration adapted to your theme and budget.</p></div></div>
        <div><span>♢</span><div><h3>Professional Team</h3><p>Organized staff from setup to the final moment.</p></div></div>
        <div><span>✓</span><div><h3>Reliable Service</h3><p>Quality equipment and dependable event support.</p></div></div>
      </div>
    </section>

    <section className="section">
      <div className="container section-heading"><p className="eyebrow">WHAT WE DO</p><h2>Everything you need for a successful event</h2><p>From the first idea to the last guest, our team helps you create a polished and welcoming atmosphere.</p></div>
      <div className="container cards-grid">{services.map(s => <ServiceCard key={s.title} {...s} />)}</div>
    </section>

    <section className="split-section container">
      <div className="split-image"><img src="/images/wedding.png" alt="Wedding decoration" /></div>
      <div className="split-content"><p className="eyebrow">YOUR VISION, OUR CRAFT</p><h2>Decoration that tells your story</h2><p>Tell us your colors, occasion, guest count and preferred style. We create a coordinated design that feels personal, elegant and practical.</p><ul className="check-list"><li>Wedding & engagement decoration</li><li>Birthday & anniversary styling</li><li>Corporate & conference setup</li><li>Sound, lighting and equipment rental</li></ul><Link to="/contact" className="btn btn-outline">Talk to Our Team</Link></div>
    </section>

    <section className="cta-section"><div className="container cta-inner"><div><p className="eyebrow">READY TO CELEBRATE?</p><h2>Let's plan your next event.</h2><p>Send us your date, venue and services you need. We'll help you shape the plan.</p></div><Link to="/book" className="btn btn-light">Start a Booking</Link></div></section>
  </>;
}
