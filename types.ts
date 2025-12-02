
export interface Shrine {
  id: string;
  name: string;
  location: string;
  useCase: string;
  subIntents: string[]; // Specific struggles for rotation
  imageUrl: string; // Used for Bento Grid / Selection
  sanctuaryImageUrl?: string; // Used for The Gate & Sanctuary background (optional)
  audioUrl: string; // Background ambience
  maxVolume?: number; // Optional max volume (0.0 to 1.0) for mixing atmospheric sounds
  description: string;
}

export type ViewState = 'GRID' | 'SANCTUARY';
