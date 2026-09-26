/**
 * Audio synthesis helper for authentic Arabic pronunciation
 * using Web Speech API with fallback phonetics and Web Audio API for Tasbih clicks.
 */

class AudioHelper {
  private synth: SpeechSynthesis | null = null;
  private audioCtx: AudioContext | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public playArabic(text: string, onEnd?: () => void) {
    if (!this.synth) {
      if (onEnd) onEnd();
      return;
    }

    try {
      this.synth.cancel(); // Stop any currently playing utterance
      if (this.synth.paused) {
        this.synth.resume();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85; // slightly slower for educational clarity
      utterance.pitch = 1.0;

      // Try to find an Arabic voice
      const voices = this.synth.getVoices();
      const arabicVoice = voices.find(
        (v) => v.lang.startsWith('ar') || v.name.toLowerCase().includes('arabic')
      );
      if (arabicVoice) {
        utterance.voice = arabicVoice;
      }

      let isFinished = false;
      const finishOnce = () => {
        if (!isFinished) {
          isFinished = true;
          if (onEnd) onEnd();
        }
      };

      utterance.onend = finishOnce;
      utterance.onerror = finishOnce;

      // Safety timeout in case browser speech synthesis hangs
      const estimatedDurationMs = Math.max(2500, text.length * 120);
      setTimeout(() => {
        finishOnce();
      }, estimatedDurationMs);

      this.synth.speak(utterance);
    } catch {
      if (onEnd) onEnd();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  public playTasbihClick() {
    if (typeof window === 'undefined') return;
    try {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.audioCtx = new AudioContextClass();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, this.audioCtx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.05);
    } catch {
      // Audio not supported or blocked by browser policy
    }
  }

  public playTasbihComplete() {
    if (typeof window === 'undefined') return;
    try {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.audioCtx = new AudioContextClass();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.audioCtx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.25);
    } catch {
      // Audio not supported
    }
  }
}

export const audioHelper = new AudioHelper();
