/*
 * DESIGN: Banksy Street Art — Raw Stencil Rebellion
 * Card data for the Bento grid.
 * Each card: video front (embedded via iframe), link back.
 * Palette: red, white, grey, dark — raw street art tones.
 */

import type { BentoCardData } from '@/components/BentoCard';

export const defaultCards: BentoCardData[] = [
  {
    id: 'card-1',
    title: 'SIGNAL PROTOCOL',
    videoUrl: 'https://www.youtube.com/embed/DXv1boalsDI?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0',
    linkUrl: 'https://signal.org',
    linkLabel: 'GET SIGNAL',
    neonColor: 'red',
    defaultWidth: 2,
    defaultHeight: 2,
  },
  {
    id: 'card-2',
    title: 'TOR BROWSER',
    videoUrl: 'https://www.youtube.com/embed/JWII85UlzKw?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0',
    linkUrl: 'https://www.torproject.org',
    linkLabel: 'BROWSE FREE',
    neonColor: 'white',
    defaultWidth: 1,
    defaultHeight: 1,
  },
  {
    id: 'card-3',
    title: 'PROTON MAIL',
    videoUrl: 'https://www.youtube.com/embed/RJMwl70-OkI?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0',
    linkUrl: 'https://proton.me',
    linkLabel: 'ENCRYPT EMAIL',
    neonColor: 'red',
    defaultWidth: 1,
    defaultHeight: 2,
  },
  {
    id: 'card-4',
    title: 'BRAVE BROWSER',
    videoUrl: 'https://www.youtube.com/embed/G-fJOJkVSic?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0',
    linkUrl: 'https://brave.com',
    linkLabel: 'DEFY ADS',
    neonColor: 'grey',
    defaultWidth: 1,
    defaultHeight: 1,
  },
  {
    id: 'card-5',
    title: 'LINUX FREEDOM',
    videoUrl: 'https://www.youtube.com/embed/o8NPllzkFhE?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0',
    linkUrl: 'https://ubuntu.com',
    linkLabel: 'GO OPEN SOURCE',
    neonColor: 'white',
    defaultWidth: 2,
    defaultHeight: 1,
  },
  {
    id: 'card-6',
    title: 'DUCKDUCKGO',
    videoUrl: 'https://www.youtube.com/embed/ZBiJbMMyVqE?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0',
    linkUrl: 'https://duckduckgo.com',
    linkLabel: 'SEARCH PRIVATE',
    neonColor: 'dark',
    defaultWidth: 1,
    defaultHeight: 1,
  },
  {
    id: 'card-7',
    title: 'ELEMENT CHAT',
    videoUrl: 'https://www.youtube.com/embed/O3YP1TU-L_8?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0',
    linkUrl: 'https://element.io',
    linkLabel: 'DECENTRALIZE',
    neonColor: 'red',
    defaultWidth: 1,
    defaultHeight: 1,
  },
  {
    id: 'card-8',
    title: 'BITWARDEN',
    videoUrl: 'https://www.youtube.com/embed/L1BNrVrvWw4?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0',
    linkUrl: 'https://bitwarden.com',
    linkLabel: 'OWN YOUR KEYS',
    neonColor: 'grey',
    defaultWidth: 1,
    defaultHeight: 2,
  },
];
