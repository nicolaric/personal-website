import { profile } from '~/lib/profile';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__line">
        <span>{profile.name}</span>
        <span className="footer__year">{new Date().getFullYear()}</span>
      </div>
      <picture>
        <source srcSet="/images/footer-fricktal.webp" type="image/webp" />
        <img className="footer__art" src="/images/footer-fricktal.jpg" alt="Watercolour of the Fricktal in spring: blossoming orchards, yellow rapeseed fields and a village beneath wooded hills." width={1916} height={821} loading="lazy" decoding="async" />
      </picture>
    </footer>
  );
}
