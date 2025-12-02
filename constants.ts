
import { Shrine } from './types';

// Using high-quality images from the provided CDN
export const SHRINES: Shrine[] = [
  {
    id: 'lourdes',
    name: 'Grotto of Our Lady',
    location: 'Lourdes, France',
    useCase: 'Healing',
    subIntents: [
      'Chronic Pain',
      'Cancer Recovery',
      'Mental Health',
      'Surgery Success',
      'Peace of Mind'
    ],
    imageUrl: 'https://cdn.jsdelivr.net/gh/peterj99/Lumen@main/lourde%20landscape.jpeg',
    sanctuaryImageUrl: 'https://cdn.jsdelivr.net/gh/peterj99/Lumen@main/lourde%20hero.jpeg', 
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/54/433589_jackthemurray_stream-river-water-up-close.wav', 
    maxVolume: 0.5, // Standard river volume
    description: 'The sacred grotto where the Virgin Mary appeared to St. Bernadette. A place of miraculous healing waters.'
  },
  {
    id: 'st-jude',
    name: 'Shrine of St. Jude',
    location: 'Chicago, USA',
    useCase: 'Financial Help',
    subIntents: [
      'Debt Relief',
      'Employment',
      'Business Success',
      'Housing Security',
      'Legal Battles'
    ],
    imageUrl: 'https://cdn.jsdelivr.net/gh/peterj99/Lumen@main/National%20Shrine%20of%20St.%20Jude%20landscape.jpeg',
    sanctuaryImageUrl: 'https://cdn.jsdelivr.net/gh/peterj99/Lumen@main/National%20Shrine%20of%20St.%20Jude%20hero.jpeg',
    audioUrl: 'https://cdn.jsdelivr.net/gh/peterj99/Lumen@e13128e2477b5aab54a2d14fdf2a247be7d549c3/gregorianchant.mp3', // Updated to new Gregorian chant
    maxVolume: 0.1, // Very low/distant
    description: 'Dedicated to the Patron Saint of Hope and impossible causes.'
  },
  {
    id: 'fatima',
    name: 'Sanctuary of Fátima',
    location: 'Fátima, Portugal',
    useCase: 'Family Peace',
    subIntents: [
      'Marriage Restoration',
      'Estranged Children',
      'Forgiveness',
      'Ending Conflict',
      'Unity at Home'
    ],
    imageUrl: 'https://cdn.jsdelivr.net/gh/peterj99/Lumen@main/Sanctuary%20of%20Fa%CC%81tima%20Portugal%20landscpae.jpeg',
    sanctuaryImageUrl: 'https://cdn.jsdelivr.net/gh/peterj99/Lumen@main/Sactuary%20of%20fatime%20hero.jpeg',
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Sound_of_birds_and_crickets.wav', // Matched to Assisi
    maxVolume: 0.4, // Soft nature sounds
    description: 'Where Our Lady of the Rosary appeared to three shepherd children.'
  },
  {
    id: 'jerusalem',
    name: 'Holy Sepulchre',
    location: 'Jerusalem',
    useCase: 'The Departed',
    subIntents: [
      'Grief & Loss',
      'Soul of a Parent',
      'Sudden Loss',
      'Anniversary of Death',
      'Heavenly Peace'
    ],
    imageUrl: 'https://cdn.jsdelivr.net/gh/peterj99/Lumen@main/Church%20of%20the%20Holy%20Sepulchre%20Jerusalem%20landscpae.jpeg',
    sanctuaryImageUrl: 'https://cdn.jsdelivr.net/gh/peterj99/Lumen@main/Church%20of%20the%20Holy%20Sepulchre%20Jerusalem%20Hero.jpeg',
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Choral_Compline_29_May_2016.ogg',
    maxVolume: 0.1, // Very low/distant
    description: 'The site of the crucifixion, burial, and resurrection of Jesus.'
  },
  {
    id: 'guadalupe',
    name: 'Basilica of Guadalupe',
    location: 'Mexico City',
    useCase: 'Miracles',
    subIntents: [
      'Impossible Odds',
      'Protection',
      'Safe Travel',
      'Finding Hope',
      'Divine Intervention'
    ],
    imageUrl: 'https://cdn.jsdelivr.net/gh/peterj99/Lumen@main/Guadalupe%20landscape.jpeg',
    sanctuaryImageUrl: 'https://cdn.jsdelivr.net/gh/peterj99/Lumen@main/Gudalupe%20hero.jpeg',
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Choral_Compline_29_May_2016.ogg',
    maxVolume: 0.12, // Distant choir
    description: 'The most visited Catholic shrine in the world, housing the tilma of St. Juan Diego.'
  },
  {
    id: 'vatican',
    name: 'St. Peter\'s Basilica',
    location: 'Vatican City',
    useCase: 'Guidance',
    subIntents: [
      'Life Purpose',
      'Vocational Calling',
      'Crisis of Faith',
      'Wisdom',
      'Leadership'
    ],
    imageUrl: 'https://cdn.jsdelivr.net/gh/peterj99/Lumen@main/vatican%20landscape.jpeg',
    sanctuaryImageUrl: 'https://cdn.jsdelivr.net/gh/peterj99/Lumen@main/vatican%20hero.jpeg',
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Bells-ProtestantTempleOfVersoix06022022.ogg',
    maxVolume: 0.12, // Distant bells
    description: 'The spiritual heart of the Church and burial site of Saint Peter.'
  },
  {
    id: 'dc',
    name: 'National Shrine',
    location: 'Washington, D.C.',
    useCase: 'The Nation',
    subIntents: [
      'Political Peace',
      'Military Safety',
      'Justice',
      'National Healing',
      'Civic Duty'
    ],
    imageUrl: 'https://cdn.jsdelivr.net/gh/peterj99/Lumen@main/Basilica%20of%20the%20National%20Shrine%20Washington%20DC%20landscpae.jpeg',
    sanctuaryImageUrl: 'https://cdn.jsdelivr.net/gh/peterj99/Lumen@main/Basilica%20of%20the%20National%20Shrine%20Washington%20DC%20hero.jpeg',
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Ye_Choirs_of_New_Jerusalem_Organ.oga',
    maxVolume: 0.15, // Soft background organ
    description: 'The largest Roman Catholic church in the United States and North America.'
  },
  {
    id: 'assisi',
    name: 'Basilica of St. Francis',
    location: 'Assisi, Italy',
    useCase: 'Inner Peace',
    subIntents: [
      'Anxiety Relief',
      'Depression',
      'Gratitude',
      'Simple Living',
      'Freedom from Worry'
    ],
    imageUrl: 'https://cdn.jsdelivr.net/gh/peterj99/Lumen@main/francis%20asssi%20landscpae.jpeg',
    sanctuaryImageUrl: 'https://cdn.jsdelivr.net/gh/peterj99/Lumen@main/francis%20assissi%20hero.jpeg',
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Sound_of_birds_and_crickets.wav',
    maxVolume: 0.4, // Gentle morning nature
    description: 'The mother church of the Franciscan Order and burial place of St. Francis.'
  }
];

// Video of a flame on black background for screen blending
export const CANDLE_FLAME_VIDEO = "https://videos.pexels.com/video-files/2901769/2901769-uhd_3840_2160_25fps.mp4";
// Fallback static candle base
export const CANDLE_BASE_IMG = "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=600&auto=format&fit=crop"; // Close up candle texture
