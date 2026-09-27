import PageHero from '../components/PageHero';
import ServiceCard from '../components/ServiceCard';

const services = [
  {image:'/images/dynn.jpg', icon:'✦', title:'Event Decoration', text:'Full venue transformation, table styling, floral arrangements, centerpieces, backdrops and themed decoration.'},
  {image:'/images/sound.jpg', icon:'🎤', title:'Ceremony Animation', text:'MC services, entertainment coordination, games, announcements and smooth program management.'},
  {image:'/images/Event Equipment.jfif', icon:'♫', title:'Sound & Lighting', text:'Speakers, microphones, DJ setup, stage lighting and event ambience for different venue sizes.'},
  {image:'/images/hero.jpg', icon:'▣', title:'Equipment Rental', text:'Chairs, tables, decorative props, tents, PA equipment and other event materials available for rental.'},
  {image:'/images/Elegant Backdrop.jfif', icon:'▥', title:'Corporate Events', text:'Professional decoration and technical support for meetings, launches, workshops and conferences.'},
  {image:'/images/Private Celebrations.jfif', icon:'✿', title:'Private Celebrations', text:'Birthday parties, baby showers, anniversaries and family celebrations designed around your style.'}
];

export default function Services() {
  return <>
    <PageHero title="Our Services" text="Complete event solutions for beautiful, organized and memorable celebrations." />
    <section className="section"><div className="container cards-grid">{services.map(s => <ServiceCard key={s.title} {...s} />)}</div></section>
    <section className="soft-section"><div className="container narrow center"><p className="eyebrow">ONE TEAM, ONE PLAN</p><h2>Combine services to build your complete event package</h2><p>For example: decoration + animation + sound + equipment rental. Use the booking form to tell us what you need and we will prepare a customized package.</p></div></section>
  </>;
}
