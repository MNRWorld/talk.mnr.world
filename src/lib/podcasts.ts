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
    title: 'Feludar Goendagiri',
    artist: 'Satyajit Ray',
    coverArt: getImage('podcast-2').imageUrl,
    coverArtHint: getImage('podcast-2').imageHint,
    audioUrl: 'https://stream.mnr.world/0:/Feluda/01.%20Feludar%20Goendagiri/Sunday%20Suspense/01.Feluda%20r%20Goendagiri%20-%20Satyajit%20Ray%20(128kpbs).mp3',
  },
  {
    id: '2',
    title: 'Badshahi Angti',
    artist: 'Satyajit Ray',
    coverArt: getImage('podcast-3').imageUrl,
    coverArtHint: getImage('podcast-3').imageHint,
    audioUrl: 'https://stream.mnr.world/0:/Feluda/02.%20Badshahi%20Angti/Sunday%20Suspense/02.Baadshaahi%20Angti%20-%20Satyajit%20Ray%20128kpbs.mp3',
  },
  {
    id: '3',
    title: 'Sheyal Debota Rahasya',
    artist: 'Satyajit Ray',
    coverArt: getImage('podcast-4').imageUrl,
    coverArtHint: getImage('podcast-4').imageHint,
    audioUrl: 'https://stream.mnr.world/0:/Feluda/04.%20Sheyal%20Debota%20Rahasya/Sunday%20Suspense/04.Sheyal%20Debota%20Rahasya%20-%20Satyajit%20Ray%20128kpbs.mp3',
  },
  {
    id: '4',
    title: 'Gangtokey Gondogol',
    artist: 'Satyajit Ray',
    coverArt: getImage('podcast-5').imageUrl,
    coverArtHint: getImage('podcast-5').imageHint,
    audioUrl: 'https://stream.mnr.world/0:/Feluda/05.%20Gangtokey%20Gondogol/Sunday%20Suspense/Gangtokey%20Gondogol%20-%20Satyajit%20Ray%20%20128kpbs.mp3',
  },
  {
    id: '5',
    title: 'Samaddarer Chabi',
    artist: 'Satyajit Ray',
    coverArt: getImage('podcast-6').imageUrl,
    coverArtHint: getImage('podcast-6').imageHint,
    audioUrl: 'https://stream.mnr.world/0:/Feluda/08.%20Samaddarer%20Chabi/Sunday%20Suspense/Samaddar-er%20Chaabi%20-%20Satyajit%20Ray%20128kpbs.mp3',
  },
  {
    id: '6',
    title: 'Ankita',
    artist: 'Aloukik Robbar',
    coverArt: getImage('podcast-1').imageUrl,
    coverArtHint: getImage('podcast-1').imageHint,
    audioUrl: 'https://stream.mnr.world/0:/Audio%20Book/Aloukik%20Robbar/Ankita.mp3',
  },
  {
    id: '7',
    title: 'Aschorjo Coin',
    artist: 'Aloukik Robbar',
    coverArt: getImage('podcast-2').imageUrl,
    coverArtHint: getImage('podcast-2').imageHint,
    audioUrl: 'https://stream.mnr.world/0:/Audio%20Book/Aloukik%20Robbar/Aschorjo%20Coin.mp3',
  },
  {
    id: '8',
    title: 'Bahurupi',
    artist: 'Aloukik Robbar',
    coverArt: getImage('podcast-3').imageUrl,
    coverArtHint: getImage('podcast-3').imageHint,
    audioUrl: 'https://stream.mnr.world/0:/Audio%20Book/Aloukik%20Robbar/Bahurupi.mp3',
  },
  {
    id: '9',
    title: 'Chitrakar',
    artist: 'Aloukik Robbar',
    coverArt: getImage('podcast-4').imageUrl,
    coverArtHint: getImage('podcast-4').imageHint,
    audioUrl: 'https://stream.mnr.world/0:/Audio%20Book/Aloukik%20Robbar/Chitrakar.mp3',
  },
  {
    id: '10',
    title: 'Chitrangada',
    artist: 'Aloukik Robbar',
    coverArt: getImage('podcast-5').imageUrl,
    coverArtHint: getImage('podcast-5').imageHint,
    audioUrl: 'https://stream.mnr.world/0:/Audio%20Book/Aloukik%20Robbar/Chitrangada.mp3',
  },
  {
    id: '11',
    title: 'Cycle',
    artist: 'Aloukik Robbar',
    coverArt: getImage('podcast-6').imageUrl,
    coverArtHint: getImage('podcast-6').imageHint,
    audioUrl: 'https://stream.mnr.world/0:/Audio%20Book/Aloukik%20Robbar/Cycle.mp3',
  },
  {
    id: '12',
    title: 'Daju',
    artist: 'Aloukik Robbar',
    coverArt: getImage('podcast-1').imageUrl,
    coverArtHint: getImage('podcast-1').imageHint,
    audioUrl: 'https://stream.mnr.world/0:/Audio%20Book/Aloukik%20Robbar/Daju.mp3',
  },
  {
    id: '13',
    title: 'Dibakar',
    artist: 'Aloukik Robbar',
    coverArt: getImage('podcast-2').imageUrl,
    coverArtHint: getImage('podcast-2').imageHint,
    audioUrl: 'https://stream.mnr.world/0:/Audio%20Book/Aloukik%20Robbar/Dibakar.mp3',
  },
  {
    id: '14',
    title: 'Doctor Pakrashi O Nil Phul',
    artist: 'Aloukik Robbar',
    coverArt: getImage('podcast-3').imageUrl,
    coverArtHint: getImage('podcast-3').imageHint,
    audioUrl: 'https://stream.mnr.world/0:/Audio%20Book/Aloukik%20Robbar/Doctor%20Pakrashi%20O%20Nil%20Phul.mp3',
  },
  {
    id: '15',
    title: 'Dr. Pakrashi R Dragon Aka Ayna',
    artist: 'Aloukik Robbar',
    coverArt: getImage('podcast-4').imageUrl,
    coverArtHint: getImage('podcast-4').imageHint,
    audioUrl: 'https://stream.mnr.world/0:/Audio%20Book/Aloukik%20Robbar/Dr.%20Pakrashi%20R%20Dragon%20Aka%20Ayna.mp3',
  },
  {
    id: '16',
    title: 'Dr. Pakrashi-er Aloukik Bislashan',
    artist: 'Aloukik Robbar',
    coverArt: getImage('podcast-5').imageUrl,
    coverArtHint: getImage('podcast-5').imageHint,
    audioUrl: 'https://stream.mnr.world/0:/Audio%20Book/Aloukik%20Robbar/Dr.%20Pakrashi-er%20Aloukik%20Bislashan.mp3',
  },
  {
    id: '17',
    title: 'Ema',
    artist: 'Aloukik Robbar',
    coverArt: getImage('podcast-6').imageUrl,
    coverArtHint: getImage('podcast-6').imageHint,
    audioUrl: 'https://stream.mnr.world/0:/Audio%20Book/Aloukik%20Robbar/Ema.mp3',
  },
  {
    id: '18',
    title: 'Gaach Manobi',
    artist: 'Aloukik Robbar',
    coverArt: getImage('podcast-1').imageUrl,
    coverArtHint: getImage('podcast-1').imageHint,
    audioUrl: 'https://stream.mnr.world/0:/Audio%20Book/Aloukik%20Robbar/Gaach%20Manobi.mp3',
  },
  {
    id: '19',
    title: 'Ghaar Beka Bajna',
    artist: 'Aloukik Robbar',
    coverArt: getImage('podcast-2').imageUrl,
    coverArtHint: getImage('podcast-2').imageHint,
    audioUrl: 'https://stream.mnr.world/0:/Audio%20Book/Aloukik%20Robbar/Ghaar%20Beka%20Bajna.mp3',
  },
  {
    id: '20',
    title: 'Gogol R Baganbarir Rahoshyomoy Ghori',
    artist: 'Aloukik Robbar',
    coverArt: getImage('podcast-3').imageUrl,
    coverArtHint: getImage('podcast-3').imageHint,
    audioUrl: 'https://stream.mnr.world/0:/Audio%20Book/Aloukik%20Robbar/Gogol%20R%20Baganbarir%20Rahoshyomoy%20Ghori.mp3',
  },
  {
    id: '21',
    title: 'Haranath er Mrityu Sakhi',
    artist: 'Aloukik Robbar',
    coverArt: getImage('podcast-4').imageUrl,
    coverArtHint: getImage('podcast-4').imageHint,
    audioUrl: 'https://stream.mnr.world/0:/Audio%20Book/Aloukik%20Robbar/Haranath%20er%20Mrityu%20Sakhi.mp3',
  },
  {
    id: '22',
    title: 'Jonmodin',
    artist: 'Aloukik Robbar',
    coverArt: getImage('podcast-5').imageUrl,
    coverArtHint: getImage('podcast-5').imageHint,
    audioUrl: 'https://stream.mnr.world/0:/Audio%20Book/Aloukik%20Robbar/Jonmodin.mp3',
  },
  {
    id: '23',
    title: 'Kaak',
    artist: 'Aloukik Robbar',
    coverArt: getImage('podcast-6').imageUrl,
    coverArtHint: getImage('podcast-6').imageHint,
    audioUrl: 'https://stream.mnr.world/0:/Audio%20Book/Aloukik%20Robbar/Kaak.mp3',
  },
  {
    id: '24',
    title: 'Mithir Ma',
    artist: 'Aloukik Robbar',
    coverArt: getImage('podcast-1').imageUrl,
    coverArtHint: getImage('podcast-1').imageHint,
    audioUrl: 'https://stream.mnr.world/0:/Audio%20Book/Aloukik%20Robbar/Mithir%20Ma.mp3',
  },
  {
    id: '25',
    title: 'Noksha',
    artist: 'Aloukik Robbar',
    coverArt: getImage('podcast-2').imageUrl,
    coverArtHint: getImage('podcast-2').imageHint,
    audioUrl: 'https://stream.mnr.world/0:/Audio%20Book/Aloukik%20Robbar/Noksha.mp3',
  },
  {
    id: '26',
    title: 'Rohoshyomoy Gari Guli',
    artist: 'Aloukik Robbar',
    coverArt: getImage('podcast-3').imageUrl,
    coverArtHint: getImage('podcast-3').imageHint,
    audioUrl: 'https://stream.mnr.world/0:/Audio%20Book/Aloukik%20Robbar/Rohoshyomoy%20Gari%20Guli.mp3',
  },
  {
    id: '27',
    title: 'Santanu-er Jonmodin',
    artist: 'Aloukik Robbar',
    coverArt: getImage('podcast-4').imageUrl,
    coverArtHint: getImage('podcast-4').imageHint,
    audioUrl: 'https://stream.mnr.world/0:/Audio%20Book/Aloukik%20Robbar/Santanu-er%20Jonmodin.mp3',
  },
  {
    id: '28',
    title: 'Swapno Chikitsa',
    artist: 'Aloukik Robbar',
    coverArt: getImage('podcast-5').imageUrl,
    coverArtHint: getImage('podcast-5').imageHint,
    audioUrl: 'https://stream.mnr.world/0:/Audio%20Book/Aloukik%20Robbar/Swapno%20Chikitsa.mp3',
  },
  {
    id: '29',
    title: 'Swarup Babur Bhul',
    artist: 'Aloukik Robbar',
    coverArt: getImage('podcast-6').imageUrl,
    coverArtHint: getImage('podcast-6').imageHint,
    audioUrl: 'https://stream.mnr.world/0:/Audio%20Book/Aloukik%20Robbar/Swarup%20Babur%20Bhul.mp3',
  },
];

    