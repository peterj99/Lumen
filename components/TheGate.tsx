import React, { useEffect, useState } from 'react';
import { Shrine } from '../types';
import { Loader2 } from 'lucide-react';

interface TheGateProps {
  shrine: Shrine;
  onEnter: () => void;
  onBack: () => void;
}

const TheGate: React.FC<TheGateProps> = ({ shrine, onEnter, onBack }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Delay showing the button to allow the "Transporting" narrative to land
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-colors duration-1000">
      
      <div className="relative z-10 max-w-lg w-full px-6 text-center">
        
        {/* Pulsing Loading State */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full animate-pulse" />
            <Loader2 className="relative text-amber-500/50 animate-spin-slow" size={48} />
          </div>
        </div>
        
        <h2 className="text-xl md:text-2xl font-serif text-slate-200 mb-2 animate-fade-in tracking-wide">
          Transporting intention...
        </h2>
        
        <p className="text-amber-500/60 text-sm uppercase tracking-[0.2em] mb-12 animate-pulse">
          To {shrine.name}
        </p>

        <div className={`transition-all duration-1000 transform ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button
            onClick={onEnter}
            className="group relative inline-flex items-center gap-3 px-8 py-4 border border-white/10 rounded-sm hover:border-amber-500/50 transition-colors duration-500"
          >
            <span className="font-serif text-slate-300 text-sm tracking-[0.2em] group-hover:text-amber-400 transition-colors">
              ARRIVE AT SANCTUARY
            </span>
          </button>
        </div>
        
         <button 
            onClick={onBack}
            className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-slate-700 hover:text-slate-500 tracking-widest uppercase transition-colors ${showButton ? 'opacity-100' : 'opacity-0'}`}
          >
            Cancel
          </button>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TheGate;