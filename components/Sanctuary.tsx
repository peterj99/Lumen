
import React, { useState, useRef, useEffect } from 'react';
import { Shrine } from '../types';
import { ArrowLeft, Volume2, VolumeX, CheckCircle, Loader2, X, MapPin } from 'lucide-react';

interface SanctuaryProps {
  shrine: Shrine;
  onBack: () => void;
}

const Sanctuary: React.FC<SanctuaryProps> = ({ shrine, onBack }) => {
  // State for the seamless entry transition
  const [isIntro, setIsIntro] = useState(true);
  
  // State for Core Sanctuary Logic
  const [isMuted, setIsMuted] = useState(false);
  const [isLit, setIsLit] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [didSubmit, setDidSubmit] = useState(false);

  // Rotating Text State
  const [currentIntentIndex, setCurrentIntentIndex] = useState(0);
  const [textOpacity, setTextOpacity] = useState(1);
  
  // Combine UseCase (Main) with SubIntents for the rotation cycle
  const displayIntents = [shrine.useCase, ...shrine.subIntents];
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // LIFECYCLE: Handle Entry, Audio Fade In, and Visual Transition
  useEffect(() => {
    let fadeInterval: ReturnType<typeof setInterval>;
    let playTimer: ReturnType<typeof setTimeout>;
    
    // 1. Audio Logic
    if (audioRef.current) {
      const audio = audioRef.current;
      audio.volume = 0; // Start silent
      
      // Delay audio start by 3 seconds
      playTimer = setTimeout(() => {
        const targetVolume = shrine.maxVolume ?? 0.5; // Use shrine specific volume or default to 0.5
        
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise.then(() => {
            // Fade in audio over 15 seconds (15000ms)
            const intervalTime = 100;
            const duration = 15000;
            const steps = duration / intervalTime;
            const volumeStep = targetVolume / steps;

            fadeInterval = setInterval(() => {
              if (audio.volume < targetVolume) {
                const newVolume = Math.min(audio.volume + volumeStep, targetVolume);
                audio.volume = newVolume;
              } else {
                clearInterval(fadeInterval);
              }
            }, intervalTime);
          }).catch(e => console.log("Autoplay blocked (rare):", e));
        }
      }, 3000);
    }

    // 2. Handle Visual Transition
    // Wait 2.5 seconds to let the "Transporting" text breathe, then reveal the shrine
    const introTimer = setTimeout(() => {
      setIsIntro(false);
    }, 2500);

    return () => {
      if (fadeInterval) clearInterval(fadeInterval);
      if (playTimer) clearTimeout(playTimer);
      clearTimeout(introTimer);
    };
  }, [shrine.maxVolume]);

  // ROTATING TEXT LOGIC
  useEffect(() => {
    if (isLit) return; // Stop rotation if candle is lit

    // Reset index when shrine changes
    setCurrentIntentIndex(0);
    setTextOpacity(1);

    const interval = setInterval(() => {
      // Fade Out
      setTextOpacity(0);
      
      setTimeout(() => {
        // Change Text
        setCurrentIntentIndex((prev) => (prev + 1) % displayIntents.length);
        // Fade In
        setTextOpacity(1);
      }, 500); // Wait for fade out to finish

    }, 4000); // 4 seconds total per text

    return () => clearInterval(interval);
  }, [displayIntents.length, isLit]);


  // Handle Mute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // The Smoke Test Logic
  const handleIgnite = () => {
    setProcessing(true);
    
    // Simulate transaction delay
    setTimeout(() => {
      setProcessing(false);
      setIsLit(true);
      
      // Show the "Upsell/Waitlist" modal after a moment of satisfaction
      setTimeout(() => {
        setShowModal(true);
      }, 2500);
    }, 1200);
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDidSubmit(true);
  };

  const bgImage = shrine.sanctuaryImageUrl || shrine.imageUrl;

  return (
    // Use h-[100dvh] for reliable full height on mobile browsers (avoids address bar issues)
    <div className="relative h-[100dvh] w-full overflow-hidden bg-slate-950 flex flex-col">
      {/* Background Audio */}
      <audio ref={audioRef} src={shrine.audioUrl} loop />

      {/* --- LAYER 1: THE SHRINE BACKGROUND --- */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-[3000ms] ease-out ${isIntro ? 'scale-110 blur-sm' : 'scale-100 blur-0 opacity-100'}`}
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      
      {/* Vignette & Gradient Overlay - Heavy at bottom for text readability */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950/90" />


      {/* --- LAYER 2: THE INTRO OVERLAY --- */}
      <div 
        className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-1000 pointer-events-none ${isIntro ? 'opacity-100' : 'opacity-0'}`}
      >
         <div className="relative z-10 max-w-lg w-full px-6 text-center">
            {/* Pulsing Loading State */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full animate-pulse" />
                <Loader2 className="relative text-amber-500/50 animate-spin-slow" size={48} />
              </div>
            </div>
            
            <h2 className="text-xl md:text-2xl font-serif text-slate-200 mb-2 animate-pulse tracking-wide">
              Transporting intention...
            </h2>
            
            <p className="text-amber-500/60 text-sm uppercase tracking-[0.2em]">
              To {shrine.name}
            </p>
         </div>
      </div>


      {/* --- LAYER 3: SANCTUARY UI --- */}
      {/* Use absolute inset-0 + flex-col justify-between to force nav to top and content to bottom */}
      <div className={`absolute inset-0 z-20 flex flex-col justify-between transition-opacity duration-1000 delay-500 ${isIntro ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* TOP: Navigation & Controls */}
        <div className="relative flex justify-between items-start p-6 md:p-8 shrink-0">
          
          {/* Left: Exit Button */}
          <button 
            onClick={onBack}
            className="relative z-30 flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-full"
          >
            <ArrowLeft size={16} />
            <span className="text-[10px] tracking-widest uppercase font-medium">Exit</span>
          </button>

          {/* Center: Title & Location (Absolute to prevent layout shift) */}
          <div className="absolute inset-x-0 top-0 pt-6 md:pt-8 flex flex-col items-center pointer-events-none px-12 z-20">
              <h1 className="text-slate-100 font-serif text-lg md:text-3xl text-center leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] shadow-black">
                {shrine.name}
              </h1>
              <div className="flex items-center gap-1.5 mt-2 bg-black/30 backdrop-blur-[2px] px-3 py-1 rounded-full border border-white/5">
                <MapPin size={10} className="text-amber-500 drop-shadow-md" />
                <p className="text-amber-200/90 text-[10px] md:text-xs uppercase tracking-[0.15em] font-medium drop-shadow-md">
                  {shrine.location}
                </p>
              </div>
          </div>

          {/* Right: Mute Button */}
          <button 
            onClick={toggleMute}
            className="relative z-30 text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 bg-black/20 backdrop-blur-sm"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>

        {/* BOTTOM: Action Area */}
        <div className="w-full max-w-lg mx-auto px-6 pb-10 md:pb-16 text-center shrink-0">
            {!isLit ? (
              <div className="animate-fade-in-up flex flex-col items-center w-full">
                
                {/* Rotating Text Area - Fixed Prefix Position */}
                <div className="h-12 w-full flex items-center justify-center mb-6">
                  <div className="flex w-full items-center drop-shadow-lg">
                    <span className="w-1/2 text-right pr-2 text-slate-100 font-serif text-lg md:text-xl tracking-wide shadow-black">
                      Light a candle for
                    </span>
                    <span 
                      className="w-1/2 text-left text-amber-400 font-medium font-serif text-lg md:text-xl tracking-wide transition-opacity duration-500 shadow-black"
                      style={{ opacity: textOpacity }}
                    >
                      {displayIntents[currentIntentIndex]}...
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={handleIgnite}
                  disabled={processing}
                  className="
                    group relative px-10 py-5 
                    bg-gradient-to-br from-amber-600/90 via-amber-700/80 to-amber-900/90 hover:from-amber-500 hover:via-amber-600 hover:to-amber-800
                    text-white font-serif tracking-widest uppercase text-sm font-bold
                    rounded-xl shadow-[0_4px_20px_rgba(217,119,6,0.3)] hover:shadow-[0_4px_30px_rgba(217,119,6,0.5)]
                    overflow-hidden
                    hover:-translate-y-0.5 transition-all duration-500
                    disabled:opacity-70 disabled:cursor-not-allowed
                    border border-amber-500/20 w-full md:w-auto
                    backdrop-blur-sm
                  "
                >
                  {/* Subtle top shine */}
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent opacity-40" />
                  
                  <span className="relative flex items-center justify-center gap-3 z-10 drop-shadow-md">
                    {processing ? (
                      <>
                        <Loader2 className="animate-spin" size={16} /> Processing...
                      </>
                    ) : (
                      <>Light Candle • $2.00</>
                    )}
                  </span>
                </button>
                
                {/* Trust Borrowing: Payment Icons */}
                <div className="mt-6 flex justify-center items-center gap-3 opacity-60 transition-opacity hover:opacity-100">
                   <span className="text-[10px] uppercase tracking-widest text-slate-300 font-medium drop-shadow-md">Secured by</span>
                   <div className="flex gap-3 grayscale drop-shadow-md">
                     <i className="fab fa-cc-visa text-xl md:text-2xl text-slate-300"></i>
                     <i className="fab fa-cc-mastercard text-xl md:text-2xl text-slate-300"></i>
                     <i className="fab fa-cc-apple-pay text-xl md:text-2xl text-slate-300"></i>
                   </div>
                </div>
              </div>
            ) : (
              <div className="animate-fade-in space-y-4 pb-8">
                <CheckCircle className="text-green-500 mx-auto drop-shadow-lg" size={48} />
                <div>
                  <p className="text-amber-400 font-serif text-2xl tracking-wide drop-shadow-md">Intent Received.</p>
                  <p className="text-slate-200 text-sm font-light drop-shadow-md mt-2">Your prayer is rising.</p>
                </div>
              </div>
            )}
        </div>

        {/* The Smoke Test Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md animate-fade-in" />
            
            <div className="relative z-10 w-full max-w-md bg-slate-900 border border-amber-500/20 p-8 rounded-lg shadow-2xl animate-scale-in">
               
               {/* Close Button */}
               <button 
                 onClick={() => setShowModal(false)}
                 className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors p-1"
                 aria-label="Close dialog"
               >
                 <X size={20} />
               </button>

               <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 p-3 rounded-full border border-amber-500/30">
                  <CheckCircle className="text-amber-500" size={32} />
               </div>

               {!didSubmit ? (
                 <>
                   <h3 className="text-2xl font-serif text-white text-center mb-4 mt-4">
                     Your Light is Burning
                   </h3>
                   <p className="text-slate-300 text-center leading-relaxed mb-6 font-light text-sm">
                     We are currently establishing the physical infrastructure with the <strong>{shrine.name}</strong>. 
                     <br/><br/>
                     Because you showed such strong faith today, we want to give you your first physical candle <strong>for free</strong> when we launch next month.
                   </p>
                   
                   <form onSubmit={handleWaitlistSubmit} className="space-y-3">
                     <div>
                       <input 
                          type="email" 
                          required
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 text-white px-4 py-3 rounded focus:outline-none focus:border-amber-500 transition-colors placeholder:text-slate-600"
                       />
                     </div>
                     <button 
                      type="submit"
                      className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-4 rounded transition-colors uppercase tracking-wider text-xs"
                     >
                       Join Priority Waitlist
                     </button>
                   </form>
                   <p className="text-center text-[10px] text-slate-500 mt-4">
                     You have not been charged.
                   </p>
                 </>
               ) : (
                 <div className="text-center py-8">
                   <h3 className="text-xl font-serif text-amber-400 mb-2">You are on the list.</h3>
                   <p className="text-slate-400 mb-6">We will notify you when the Sanctuary opens physically.</p>
                   <button onClick={onBack} className="text-sm text-white underline underline-offset-4 decoration-amber-500/50">
                      Return to Shrine Map
                   </button>
                 </div>
               )}
            </div>
          </div>
        )}
      </div>

      {/* CSS for custom animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.4s ease-out forwards; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
      `}</style>
    </div>
  );
};

export default Sanctuary;
