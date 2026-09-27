import PageHero from '../components/PageHero';
import { Link } from 'react-router-dom';

export default function About() {
  return <>
    <PageHero title="About Dynamic Service" text="A creative event partner focused on decoration, entertainment and reliable technical support." />
    <section className="section"><div className="container split-section about-split"><div className="split-image"><img src="/images/dyn.jpg" alt="Dynamic Service team" /></div><div className="split-content"><p className="eyebrow">WHO WE ARE</p><h2>We make event planning simpler.</h2><p>Dynamic Service brings several event needs together under one service: creative decoration, ceremony animation, sound and lighting, and equipment rental.</p><p>Our approach is simple: understand your occasion, propose a practical design, prepare the equipment and deliver an organized setup.</p><Link to="/book" className="btn btn-primary">Plan an Event</Link></div></div></section>
    <section className="soft-section"><div className="container values-grid"><div><b>01</b><h3>Creativity</h3><p>Every event receives a design that matches its atmosphere.</p></div><div><b>02</b><h3>Reliability</h3><p>We prepare equipment and schedules carefully.</p></div><div><b>03</b><h3>Flexibility</h3><p>Packages can be adapted to your venue and budget.</p></div></div></section>
  </>;
}
