import { useEffect, useState } from 'react';

import { experience, interests, profile, socials, type SocialKind } from '~/lib/profile';
import { GitHubIcon, LinkedInIcon, MailIcon, SpeakerIcon, XIcon } from './icons';

const SOCIAL_ICONS: Record<SocialKind, typeof GitHubIcon> = {
  github: GitHubIcon,
  x: XIcon,
  linkedin: LinkedInIcon,
  email: MailIcon,
};

const INTEREST_INTERVAL_MS = 3200;

function speakName() {
  if (!('speechSynthesis' in window)) {
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(profile.name);
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

function InterestTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % interests.length), INTEREST_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, []);

  const current = interests[index];

  return (
    <p className="ticker" aria-live="polite">
      <span key={index} className="ticker__item">
        <span className="ticker__emoji" aria-hidden="true">
          {current.emoji}
        </span>
        <span className="ticker__verb">{current.verb}</span>
        <span className="ticker__dash" aria-hidden="true">
          —
        </span>
        <span className="ticker__subject">{current.subject}</span>
      </span>
    </p>
  );
}

export function Hero() {
  return (
    <header className="hero" id="about">
      <div className="hero__head">
        <img className="hero__avatar" src={profile.avatar} alt={profile.name} width={132} height={132} />
        <div>
          <h1 className="hero__handle">{profile.handle}</h1>
          <p className="hero__entry">
            <span>{profile.name}</span>
            <span className="hero__sep" aria-hidden="true" />
            <i>{profile.partOfSpeech}</i>
            <button type="button" className="hero__speak" onClick={speakName} aria-label={`Pronounce ${profile.name}`}>
              <SpeakerIcon width={12} height={12} />
            </button>
          </p>
        </div>
      </div>

      <p className="hero__tagline">{profile.tagline}</p>

      <hr className="rule rule--short" />

      <p className="worked">
        <span>I've worked for:</span>
        {experience.map((each) => (
          <a key={each.company} className="tile-link" href={each.href} target="_blank" rel="noreferrer" title={each.company}>
            <img className="tile tile--sm" src={each.logo} alt={each.company} width={22} height={22} />
          </a>
        ))}
      </p>

      <hr className="rule rule--short" />

      <InterestTicker />

      <hr className="rule" />

      <ul className="chips">
        {socials.map((each) => {
          const Icon = SOCIAL_ICONS[each.kind];
          return (
            <li key={each.kind}>
              <a className="chip chip--link" href={each.href} target={each.kind === 'email' ? undefined : '_blank'} rel="noreferrer">
                <Icon />
                {each.label}
              </a>
            </li>
          );
        })}
      </ul>
    </header>
  );
}
