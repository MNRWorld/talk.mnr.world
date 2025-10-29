import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;

export type Podcast = {
  id: string;
  title: string;
  artist: string;
  coverArt: string;
  coverArtHint: string;
  audioUrl: string;
};

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id) || PlaceHolderImages[0];

export const podcasts: Podcast[] = [
  {
    id: '1',
    title: 'The Future of AI',
    artist: 'Tech Forward',
    coverArt: getImage('podcast-5').imageUrl,
    coverArtHint: getImage('podcast-5').imageHint,
    audioUrl: 'https://storage.googleapis.com/stuben-dev-public-media/creative-commons-music/blue-dot-sessions-the-federation.mp3',
  },
  {
    id: '2',
    title: 'Design Principles',
    artist: 'Creative Minds',
    coverArt: getImage('podcast-4').imageUrl,
    coverArtHint: getImage('podcast-4').imageHint,
    audioUrl: 'https://storage.googleapis.com/stuben-dev-public-media/creative-commons-music/blue-dot-sessions-plastic-soda.mp3',
  },
  {
    id: '3',
    title: 'Startup Stories',
    artist: 'Founder\'s Journey',
    coverArt: getImage('podcast-2').imageUrl,
    coverArtHint: getImage('podcast-2').imageHint,
    audioUrl: 'https://storage.googleapis.com/stuben-dev-public-media/creative-commons-music/blue-dot-sessions-velvet-ladder.mp3',
  },
  {
    id: '4',
    title: 'Late Night Thoughts',
    artist: 'The Philosopher',
    coverArt: getImage('podcast-3').imageUrl,
    coverArtHint: getImage('podcast-3').imageHint,
    audioUrl: 'https://storage.googleapis.com/stuben-dev-public-media/creative-commons-music/blue-dot-sessions-down-by-the-creek.mp3',
  },
  {
    id: '5',
    title: 'Audio Escapes',
    artist: 'SoundScapes',
    coverArt: getImage('podcast-1').imageUrl,
    coverArtHint: getImage('podcast-1').imageHint,
    audioUrl: 'https://storage.googleapis.com/stuben-dev-public-media/creative-commons-music/blue-dot-sessions-chromatone.mp3',
  },
  {
    id: '6',
    title: 'Mindful Moments',
    artist: 'Zen Zone',
    coverArt: getImage('podcast-6').imageUrl,
    coverArtHint: getImage('podcast-6').imageHint,
    audioUrl: 'https://storage.googleapis.com/stuben-dev-public-media/creative-commons-music/blue-dot-sessions-slow-lane.mp3',
  },
];
