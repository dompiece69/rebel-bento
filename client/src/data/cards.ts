/*
 * DESIGN: Neon Vandal — Cyberpunk Graffiti Noir
 * Card data for the Bento grid.
 * Each card has a video front (embedded via iframe) and a link back.
 * Users can customize these entries.
 */

import type { BentoCardData } from '@/components/BentoCard';

export const defaultCards: BentoCardData[] = [
  {
    id: 'card-1',
    title: 'SIGNAL PROTOCOL',
    videoUrl: 'https://www.youtube.com/embed/DXv1boalsDI?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0',
    linkUrl: 'https://signal.org',
    linkLabel: 'GET SIGNAL',
    neonColor: 'green',
    defaultWidth: 2,
    defaultHeight: 2,
    rotation: -0.5,
  },
  {
    id: 'card-2',
    title: 'TOR BROWSER',
    videoUrl: 'https://www.youtube.com/embed/JWII85UlzKw?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0',
    linkUrl: 'https://www.torproject.org',
    linkLabel: 'BROWSE FREE',
    neonColor: 'blue',
    defaultWidth: 1,
    defaultHeight: 1,
    rotation: 0.8,
  },
  {
    id: 'card-3',
    title: 'PROTON MAIL',
    videoUrl: 'https://www.youtube.com/embed/RJMwl70-OkI?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0',
    linkUrl: 'https://proton.me',
    linkLabel: 'ENCRYPT EMAIL',
    neonColor: 'pink',
    defaultWidth: 1,
    defaultHeight: 2,
    rotation: -1.2,
  },
  {
    id: 'card-4',
    title: 'BRAVE BROWSER',
    videoUrl: 'https://www.youtube.com/embed/G-fJOJkVSic?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0',
    linkUrl: 'https://brave.com',
    linkLabel: 'DEFY ADS',
    neonColor: 'amber',
    defaultWidth: 1,
    defaultHeight: 1,
    rotation: 0.5,
  },
  {
    id: 'card-5',
    title: 'LINUX FREEDOM',
    videoUrl: 'https://www.youtube.com/embed/o8NPllzkFhE?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0',
    linkUrl: 'https://ubuntu.com',
    linkLabel: 'GO OPEN SOURCE',
    neonColor: 'green',
    defaultWidth: 2,
    defaultHeight: 1,
    rotation: -0.3,
  },
  {
    id: 'card-6',
    title: 'DUCKDUCKGO',
    videoUrl: 'https://www.youtube.com/embed/ZBiJbMMyVqE?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0',
    linkUrl: 'https://duckduckgo.com',
    linkLabel: 'SEARCH PRIVATE',
    neonColor: 'blue',
    defaultWidth: 1,
    defaultHeight: 1,
    rotation: 1.0,
  },
  {
    id: 'card-7',
    title: 'ELEMENT CHAT',
    videoUrl: 'https://www.youtube.com/embed/O3YP1TU-L_8?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0',
    linkUrl: 'https://element.io',
    linkLabel: 'DECENTRALIZE',
    neonColor: 'pink',
    defaultWidth: 1,
    defaultHeight: 1,
    rotation: -0.7,
  },
  {
    id: 'card-8',
    title: 'BITWARDEN',
    videoUrl: 'https://www.youtube.com/embed/L1BNrVrvWw4?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0',
    linkUrl: 'https://bitwarden.com',
    linkLabel: 'OWN YOUR KEYS',
    neonColor: 'amber',
    defaultWidth: 1,
    defaultHeight: 2,
    rotation: 0.4,
  },
];
