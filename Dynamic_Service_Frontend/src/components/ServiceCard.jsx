import { Link } from 'react-router-dom';

export default function ServiceCard({image, icon, title, text}) {
  return (
    <article className="service-card">
      <img src={image} alt={title} />
      <div className="service-card-body">
        <div className="service-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{text}</p>
        <Link to="/book" className="text-link">Request this service →</Link>
      </div>
    </article>
  );
}
