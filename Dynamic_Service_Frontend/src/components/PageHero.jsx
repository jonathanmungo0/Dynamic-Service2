export default function PageHero({title, text}) {
  return (
    <section className="page-hero">
      <div className="container page-hero-inner">
        <p className="image:'/images/dd.jpg'/">DYNAMIC SERVICE</p>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}
