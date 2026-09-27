import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="brand" aria-label="Dynamic Service home">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 52 52" role="img">
          <circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M14 31c7-14 17-14 24-1" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M16 21c4 3 8 3 12 0s8-3 10 0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="17" cy="17" r="2" fill="currentColor" />
          <circle cx="35" cy="17" r="2" fill="currentColor" />
        </svg>
      </span>
      <span>
        <strong>DYNAMIC</strong>
        <small>Service</small>
      </span>
    </Link>
  );
}
