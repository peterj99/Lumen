
import React from 'react';
import { SHRINES } from '../constants';
import { Shrine } from '../types';
import { Sparkles, MapPin, ArrowRight } from 'lucide-react';

interface BentoGridProps {
  onSelect: (shrine: Shrine) => void;
}

const BentoGrid: React.FC<BentoGridProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 md:px-8 md:py-16 lg:px-16">
      
      {/* Header */}
      <header className="mb-10 text-center animate-fade-in-up">
        <div className="mb-3 flex items-center justify-center gap-2 text-amber-500/80">
          <Sparkles size={14} />
          <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">The Digital Sanctuary</span>
          <Sparkles size={14} />
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-slate-100 mb-4 tracking-wide leading-tight">
          Bring Your Burdens to The Light
        </h1>
        <p className="text-slate-400 font-light max-w-lg mx-auto text-xs md:text-sm leading-relaxed px-4">
          Every struggle has a patron sanctuary. Whether you seek healing, miracles, or peace, select the holy site specifically dedicated to interceding for your need.
        </p>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto pb-12">
        {SHRINES.map((shrine) => {
          return (
            <div
              key={shrine.id}
              onClick={() => onSelect(shrine)}
              className="
                group relative overflow-hidden rounded-xl cursor-pointer border border-white/5
                transition-all duration-700 ease-out 
                active:scale-95 md:hover:scale-[1.02] md:hover:shadow-2xl md:hover:shadow-amber-900/20 md:hover:border-amber-500/30
                min-h-[230px] md:min-h-[350px]
              "
            >
              {/* Background Image - Quotes added to support parentheses in URLs */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-in-out md:group-hover:scale-110 opacity-70 md:opacity-60 md:group-hover:opacity-40"
                style={{ backgroundImage: `url('${shrine.imageUrl}')` }}
              />
              
              {/* Dark Gradient Overlay - Stronger at bottom for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Content Container */}
              <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end md:justify-center items-center text-center z-10">
                
                {/* 
                  Mobile UX Strategy: 
                  - Content is static and visible.
                  - Desktop: Content slides up and reveals details on hover.
                */}
                <div className="transform transition-transform duration-500 md:translate-y-6 md:group-hover:translate-y-0 flex flex-col items-center w-full">
                  
                  {/* Primary: The Use Case (The Need) */}
                  <h3 className="font-serif text-white font-medium leading-none tracking-wider uppercase drop-shadow-md mb-3 text-2xl md:text-3xl">
                    {shrine.useCase}
                  </h3>

                  {/* Decorative Line (Desktop Only) */}
                  <div className="hidden md:block h-px bg-amber-500/50 mx-auto mb-3 transition-all duration-500 w-0 group-hover:w-12" />

                  {/* Secondary Group: Location & Details */}
                  <div className="flex flex-col items-center gap-1 transition-opacity duration-300 opacity-90 md:opacity-0 md:group-hover:opacity-100">
                    
                    {/* Shrine Name */}
                    <span className="font-serif text-sm md:text-base italic text-amber-100">
                      {shrine.name}
                    </span>
                    
                    {/* Location Badge */}
                    <div className="flex items-center gap-1 mt-1 bg-slate-950/50 px-2 py-1 rounded-full backdrop-blur-sm border border-white/5">
                      <MapPin size={10} className="text-amber-500" />
                      <span className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-slate-300 font-medium">
                        {shrine.location}
                      </span>
                    </div>

                    {/* Desktop Hover CTA - New Addition */}
                    <div className="hidden md:flex items-center gap-2 mt-4 text-amber-400 font-serif text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <span>Enter Sanctuary</span>
                      <ArrowRight size={12} />
                    </div>

                  </div>
                  
                </div>

                {/* Mobile Only: Simple Arrow (Standard thickness) */}
                <div className="md:hidden absolute bottom-4 right-4">
                  <ArrowRight size={24} className="text-amber-500 drop-shadow-lg" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <footer className="text-center text-slate-700 text-[10px] tracking-widest uppercase pb-8">
        <p>© {new Date().getFullYear()} Lumen Sanctuary. All Rights Reserved.</p>
      </footer>
      
       <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default BentoGrid;
