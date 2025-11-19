'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SpeechPlayerProps {
  contentRef: React.RefObject<HTMLElement>;
  lang: 'id' | 'en';
}

const SpeechPlayer: React.FC<SpeechPlayerProps> = ({ contentRef, lang }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const elementQueueRef = useRef<HTMLElement[]>([]);
  const currentElementIndexRef = useRef(0);
  const highlightedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const synth = window.speechSynthesis;
    return () => {
      if (highlightedElementRef.current) {
        highlightedElementRef.current.classList.remove('tts-highlight');
      }
      synth.cancel();
    };
  }, []);

  const clearHighlight = () => {
    if (highlightedElementRef.current) {
      highlightedElementRef.current.classList.remove('tts-highlight');
      highlightedElementRef.current.style.backgroundColor = '';
      highlightedElementRef.current = null;
    }
  };

  const speakNext = () => {
    if (currentElementIndexRef.current >= elementQueueRef.current.length) {
      setIsPlaying(false);
      setIsPaused(false);
      clearHighlight();
      return;
    }

    clearHighlight();

    const element = elementQueueRef.current[currentElementIndexRef.current];
    const text = element.innerText;

    // Skip empty elements
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
      element.classList.add('tts-highlight');
      element.style.backgroundColor = 'rgba(255, 255, 0, 0.3)'; // yellow-ish highlight
      highlightedElementRef.current = element;
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    utterance.onend = () => {
      currentElementIndexRef.current++;
      speakNext();
    };

    utterance.onerror = (e) => {
      console.error("Speech synthesis error:", e);
      // Try to continue with the next element
      currentElementIndexRef.current++;
      speakNext();
    };

    window.speechSynthesis.speak(utterance);
  };

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (synth.paused && isPaused) {
      synth.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    if (contentRef.current) {
      // Query for speakable elements
      const elements = Array.from(contentRef.current.querySelectorAll('h1, h2, h3, h4, p, li, blockquote'));
      elementQueueRef.current = elements as HTMLElement[];
      currentElementIndexRef.current = 0;

      synth.cancel(); // Stop any previous speech
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
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    currentElementIndexRef.current = 0;
    elementQueueRef.current = [];
    clearHighlight();
  };

  if (!isMounted) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center gap-4 rounded-full bg-background/80 p-3 shadow-lg backdrop-blur-sm border border-border">
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
