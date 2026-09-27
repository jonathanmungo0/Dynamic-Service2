import PageHero from '../components/PageHero';

const items = [
  ['/images/deco1.jfif','Wedding Decoration'], ['/images/Birthday Celebration.jfif','Birthday Celebration'], ['/images/coorpe.jfif','Corporate Setup'], ['/images/Elegant Backdrop.jfif','Elegant Backdrop'], ['/images/Sound & Lighting.jfif','Sound & Lighting'], ['/images/Event Equipment.jfif','Event Equipment']
];

export default function Gallery() {
  return <>
    <PageHero title="Our Gallery" text="A visual showcase of the kind of event experiences Dynamic Service can create." />
    <section className="section"><div className="container gallery-grid">{items.map(([image,title]) => <figure key={title}><img src={image} alt={title}/><figcaption>{title}</figcaption></figure>)}</div></section>
  </>;
}
