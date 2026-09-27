import { useState } from 'react';
import PageHero from '../components/PageHero';

export default function Contact() {
  const [sent, setSent] = useState(false);
  function submit(e){e.preventDefault(); setSent(true); e.currentTarget.reset();}
  return <>
    <PageHero title="Contact Us" text="Have a question, an event date or a decoration idea? Send us a message." />
    <section className="section"><div className="container contact-grid"><div className="contact-info"><p className="eyebrow">GET IN TOUCH</p><h2>Let's discuss your event.</h2><p>Share the date, location, type of event and services you need. We will get back to you with the next steps.</p><div className="contact-item"><b>📍 Location</b><span>Kigali, Rwanda</span></div><div className="contact-item"><b>📞 Phone</b><span>+250 7XX XXX XXX</span></div><div className="contact-item"><b>✉️ Email</b><span>info@dynamicservice.rw</span></div><div className="contact-item"><b>🕒 Hours</b><span>Monday–Sunday, 8:00 AM–8:00 PM</span></div></div><form className="form-card" onSubmit={submit}><label>Full Name<input required name="name" placeholder="Your full name"/></label><label>Email<input required type="email" name="email" placeholder="you@example.com"/></label><label>Phone<input name="phone" placeholder="+250 ..."/></label><label>Subject<input required name="subject" placeholder="What is this regarding?"/></label><label>Message<textarea required name="message" rows="6" placeholder="Tell us about your event..."></textarea></label><button className="btn btn-primary" type="submit">Send Message</button>{sent && <p className="success">✓ Message prepared successfully. Connect this form to your backend/email service to receive submissions.</p>}</form></div></section>
  </>;
}
