import React, { useState, useLayoutEffect } from 'react';
import BentoGrid from './components/BentoGrid';
import Sanctuary from './components/Sanctuary';
import { ViewState, Shrine } from './types';

function App() {
  const [viewState, setViewState] = useState<ViewState>('GRID');
  const [selectedShrine, setSelectedShrine] = useState<Shrine | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Flow: Grid -> Sanctuary (Seamless transition handled inside Sanctuary)

  const handleShrineSelect = (shrine: Shrine) => {
    // Save the current scroll position before switching
    setScrollPosition(window.scrollY);
    setSelectedShrine(shrine);
    setViewState('SANCTUARY');
  };

  const handleBackToGrid = () => {
    setViewState('GRID');
    setSelectedShrine(null);
  };

  // Handle scroll behavior when views change
  useLayoutEffect(() => {
    if (viewState === 'GRID') {
      // Restore previous scroll position when returning to grid
      window.scrollTo(0, scrollPosition);
    } else if (viewState === 'SANCTUARY') {
      // Ensure sanctuary always starts at the top
      window.scrollTo(0, 0);
    }
  }, [viewState, scrollPosition]);

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 antialiased selection:bg-amber-500/30">
      
      {viewState === 'GRID' && (
        <BentoGrid onSelect={handleShrineSelect} />
      )}

      {viewState === 'SANCTUARY' && selectedShrine && (
        <Sanctuary 
          shrine={selectedShrine} 
          onBack={handleBackToGrid}
        />
      )}
    </div>
  );
}

export default App;