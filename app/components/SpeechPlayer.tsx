'use client';

import { useState, useEffect, useRef, MouseEvent, TouchEvent, useCallback } from 'react';
import { Play, Pause, RotateCcw, GripVertical } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SpeechPlayerProps {
  contentRef: React.RefObject<HTMLElement>;
  lang: 'id' | 'en';
}

const SpeechPlayer: React.FC<SpeechPlayerProps> = ({ contentRef, lang }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Draggable state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragStartPosRef = useRef({ x: 0, y: 0 }); // To store initial mouse position on drag start
  const playerStartPosRef = useRef({ x: 0, y: 0 }); // To store initial player position on drag start

  const playerRef = useRef<HTMLDivElement>(null);
  const elementQueueRef = useRef<HTMLElement[]>([]);
  const currentElementIndexRef = useRef(0);
  const highlightedElementRef = useRef<HTMLElement | null>(null);

  // Control ref to handle stopping efficiently across callbacks
  const shouldStopRef = useRef(false);

  const handleMouseMove = useCallback((e: globalThis.MouseEvent) => {
    const dx = e.clientX - dragStartPosRef.current.x;
    const dy = e.clientY - dragStartPosRef.current.y;
    setPosition({
      x: playerStartPosRef.current.x + dx,
      y: playerStartPosRef.current.y + dy,
    });
  }, []);

  const handleTouchMove = useCallback((e: globalThis.TouchEvent) => {
    const dx = e.touches[0].clientX - dragStartPosRef.current.x;
    const dy = e.touches[0].clientY - dragStartPosRef.current.y;
    setPosition({
      x: playerStartPosRef.current.x + dx,
      y: playerStartPosRef.current.y + dy,
    });
  }, []);

  const handleDragEnd = useCallback(() => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('mouseup', handleDragEnd);
    window.removeEventListener('touchend', handleDragEnd);
  }, [handleMouseMove, handleTouchMove]);

  const handleDragStart = useCallback((clientX: number, clientY: number) => {
    dragStartPosRef.current = { x: clientX, y: clientY };
    playerStartPosRef.current = { ...position };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchend', handleDragEnd);
  }, [position, handleMouseMove, handleTouchMove, handleDragEnd]);

  const handleMouseDown = (e: MouseEvent) => handleDragStart(e.clientX, e.clientY);
  const handleTouchStart = (e: TouchEvent) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY);

  useEffect(() => {
    setIsMounted(true);
    // Set initial position to bottom right after mount
    if (playerRef.current) {
        const playerWidth = playerRef.current.offsetWidth;
        const playerHeight = playerRef.current.offsetHeight;
        setPosition({
            x: window.innerWidth - playerWidth - 16,
            y: window.innerHeight - playerHeight - 16
        });
    }

    const synth = window.speechSynthesis;
    return () => {
      shouldStopRef.current = true; // Signal to stop any pending loops
      synth.cancel();
      handleDragEnd(); // Clean up listeners on unmount
    };
  }, [handleDragEnd]);

  const clearHighlight = () => {
    if (highlightedElementRef.current) {
      highlightedElementRef.current.classList.remove('tts-highlight');
      highlightedElementRef.current.style.backgroundColor = '';
      highlightedElementRef.current = null;
    }
  };

  const speakNext = () => {
    if (shouldStopRef.current) {
        // If we were told to stop, ensure we clean up and don't continue
        clearHighlight();
        return;
    }

    if (currentElementIndexRef.current >= elementQueueRef.current.length) {
      setIsPlaying(false);
      setIsPaused(false);
      clearHighlight();
      return;
    }
    clearHighlight();
    const element = elementQueueRef.current[currentElementIndexRef.current];
    const text = element.innerText;
    if (!text || text.trim().length === 0) {
        currentElementIndexRef.current++;
        speakNext();
        return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'id' ? 'id-ID' : 'en-US';
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = voices.find(voice => voice.lang === utterance.lang && voice.name.includes('Google'));
    if (!selectedVoice) {
      selectedVoice = voices.find(voice => voice.lang === utterance.lang);
    }
    utterance.voice = selectedVoice || null;
    utterance.onstart = () => {
      // Double check if we stopped while loading
      if (shouldStopRef.current) {
        window.speechSynthesis.cancel();
        clearHighlight();
        return;
      }
      element.classList.add('tts-highlight');
      element.style.backgroundColor = 'rgba(255, 255, 0, 0.3)';
      highlightedElementRef.current = element;
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    utterance.onend = () => {
      if (shouldStopRef.current) return;
      currentElementIndexRef.current++;
      speakNext();
    };
    utterance.onerror = (e) => {
      console.error("Speech synthesis error:", e);
      if (shouldStopRef.current) return;

      // If error is 'interrupted', it usually means cancel() was called.
      // We should verify if we intended to stop.
      // But since we have shouldStopRef, we are safe.

      currentElementIndexRef.current++;
      speakNext();
    };
    window.speechSynthesis.speak(utterance);
  };

  const handlePlay = () => {
    shouldStopRef.current = false;
    const synth = window.speechSynthesis;
    if (synth.paused && isPaused) {
      synth.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }
    if (contentRef.current) {
      const elements = Array.from(contentRef.current.querySelectorAll('h1, h2, h3, h4, p, li, blockquote'));
      elementQueueRef.current = elements as HTMLElement[];
      currentElementIndexRef.current = 0;
      synth.cancel();
      speakNext();
      setIsPlaying(true);
      setIsPaused(false);
    }
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPlaying(false);
    setIsPaused(true);
  };

  const handleStop = () => {
    shouldStopRef.current = true;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    currentElementIndexRef.current = 0;
    elementQueueRef.current = [];
    clearHighlight();
  };


  if (!isMounted) return null;

  return (
    <div
      ref={playerRef}
      className="fixed z-50 touch-none"
      style={{
        left: 0,
        top: 0,
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <div className="flex items-center gap-4 rounded-full bg-background/80 p-3 shadow-lg backdrop-blur-sm border border-border">
        <div
          className="cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
            <GripVertical size={24} className="text-foreground/50"/>
        </div>

        {isPlaying ? (
          <button onClick={handlePause} className="text-foreground transition-colors hover:text-primary" aria-label="Pause article">
            <Pause size={24} />
          </button>
        ) : (
          <button onClick={handlePlay} className="text-foreground transition-colors hover:text-primary" aria-label={isPaused ? "Resume article" : "Play article"}>
            <Play size={24} />
          </button>
        )}

        <div className={cn("flex items-center gap-1", { 'animate-pulse': isPlaying })}>
            <span className={cn("h-4 w-1 rounded-full bg-primary/50", isPlaying && "animate-pulse duration-1000")}></span>
            <span className={cn("h-2 w-1 rounded-full bg-primary/50", isPlaying && "animate-pulse delay-100 duration-1000")}></span>
            <span className={cn("h-4 w-1 rounded-full bg-primary/50", isPlaying && "animate-pulse delay-200 duration-1000")}></span>
            <span className={cn("h-3 w-1 rounded-full bg-primary/50", isPlaying && "animate-pulse delay-300 duration-1000")}></span>
            <span className={cn("h-5 w-1 rounded-full bg-primary/50", isPlaying && "animate-pulse delay-500 duration-1000")}></span>
        </div>

        {(isPlaying || isPaused) && (
             <button onClick={handleStop} className="text-foreground transition-colors hover:text-destructive" aria-label="Stop reading">
                <RotateCcw size={20} />
            </button>
        )}
      </div>
    </div>
  );
};

export default SpeechPlayer;
