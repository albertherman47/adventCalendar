// Self-contained festive Christmas music box & cozy hearth sound generator using Web Audio API
// Features authentic holiday carols ("We Wish You A Merry Christmas", "Silent Night", "Jingle Bells")
// Plays crystalline music-box chimes and warm fireplace crackle without any external MP3 dependencies.

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let fireplaceSource: AudioBufferSourceNode | null = null;
let isPlaying = false;
let playbackTimer: number | null = null;
let currentNoteIndex = 0;
let currentSongIndex = 0;

interface Note {
  pitch: number; // frequency in Hz, 0 for rest
  duration: number; // in beats
  bass?: number; // optional accompanying root note
}

// Frequencies for standard scale notes
const N = {
  REST: 0,
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
  C4: 261.63, Cs4: 277.18, D4: 293.66, Ds4: 311.13, E4: 329.63, F4: 349.23, Fs4: 369.99, G4: 392.00, Gs4: 415.30, A4: 440.00, As4: 466.16, B4: 493.88,
  C5: 523.25, Cs5: 554.37, D5: 587.33, Ds5: 622.25, E5: 659.25, F5: 698.46, Fs5: 739.99, G5: 783.99, Gs5: 830.61, A5: 880.00, As5: 932.33, B5: 987.77,
  C6: 1046.50, D6: 1174.66, E6: 1318.51,
};

// Song 1: We Wish You A Merry Christmas
const WE_WISH_YOU: Note[] = [
  { pitch: N.D4, duration: 1, bass: N.G3 },
  { pitch: N.G4, duration: 1 },
  { pitch: N.G4, duration: 0.5 },
  { pitch: N.A4, duration: 0.5 },
  { pitch: N.G4, duration: 0.5 },
  { pitch: N.Fs4, duration: 0.5 },
  { pitch: N.E4, duration: 1, bass: N.C3 },
  { pitch: N.E4, duration: 1 },
  { pitch: N.E4, duration: 1 },
  { pitch: N.A4, duration: 1, bass: N.D3 },
  { pitch: N.A4, duration: 0.5 },
  { pitch: N.B4, duration: 0.5 },
  { pitch: N.A4, duration: 0.5 },
  { pitch: N.G4, duration: 0.5 },
  { pitch: N.Fs4, duration: 1, bass: N.B3 },
  { pitch: N.D4, duration: 1 },
  { pitch: N.D4, duration: 1 },
  { pitch: N.B4, duration: 1, bass: N.G3 },
  { pitch: N.B4, duration: 0.5 },
  { pitch: N.C5, duration: 0.5 },
  { pitch: N.B4, duration: 0.5 },
  { pitch: N.A4, duration: 0.5 },
  { pitch: N.G4, duration: 1, bass: N.C3 },
  { pitch: N.E4, duration: 1 },
  { pitch: N.D4, duration: 0.5, bass: N.D3 },
  { pitch: N.D4, duration: 0.5 },
  { pitch: N.E4, duration: 1 },
  { pitch: N.A4, duration: 1 },
  { pitch: N.Fs4, duration: 1, bass: N.D3 },
  { pitch: N.G4, duration: 2.5, bass: N.G3 },
  { pitch: N.REST, duration: 1 },
];

// Song 2: Silent Night (Csendes Éj / Noapte de Vis)
const SILENT_NIGHT: Note[] = [
  { pitch: N.G4, duration: 1.5, bass: N.C3 },
  { pitch: N.A4, duration: 0.5 },
  { pitch: N.G4, duration: 1 },
  { pitch: N.E4, duration: 3, bass: N.C3 },
  { pitch: N.G4, duration: 1.5, bass: N.C3 },
  { pitch: N.A4, duration: 0.5 },
  { pitch: N.G4, duration: 1 },
  { pitch: N.E4, duration: 3, bass: N.C3 },
  { pitch: N.D5, duration: 2, bass: N.G3 },
  { pitch: N.D5, duration: 1 },
  { pitch: N.B4, duration: 3, bass: N.G3 },
  { pitch: N.C5, duration: 2, bass: N.C3 },
  { pitch: N.C5, duration: 1 },
  { pitch: N.G4, duration: 3, bass: N.C3 },
  { pitch: N.A4, duration: 2, bass: N.F3 },
  { pitch: N.A4, duration: 1 },
  { pitch: N.C5, duration: 1.5 },
  { pitch: N.B4, duration: 0.5 },
  { pitch: N.A4, duration: 1 },
  { pitch: N.G4, duration: 1.5, bass: N.C3 },
  { pitch: N.A4, duration: 0.5 },
  { pitch: N.G4, duration: 1 },
  { pitch: N.E4, duration: 3, bass: N.C3 },
  { pitch: N.D5, duration: 2, bass: N.G3 },
  { pitch: N.D5, duration: 1 },
  { pitch: N.F5, duration: 1.5 },
  { pitch: N.D5, duration: 0.5 },
  { pitch: N.B4, duration: 1 },
  { pitch: N.C5, duration: 3, bass: N.C3 },
  { pitch: N.E5, duration: 3 },
  { pitch: N.C5, duration: 1.5, bass: N.C3 },
  { pitch: N.G4, duration: 0.5 },
  { pitch: N.E4, duration: 1 },
  { pitch: N.G4, duration: 1.5, bass: N.G3 },
  { pitch: N.F4, duration: 0.5 },
  { pitch: N.D4, duration: 1 },
  { pitch: N.C4, duration: 3.5, bass: N.C3 },
  { pitch: N.REST, duration: 1 },
];

// Song 3: Jingle Bells (Száncsengő)
const JINGLE_BELLS: Note[] = [
  { pitch: N.E4, duration: 1, bass: N.C3 },
  { pitch: N.E4, duration: 1 },
  { pitch: N.E4, duration: 2 },
  { pitch: N.E4, duration: 1, bass: N.C3 },
  { pitch: N.E4, duration: 1 },
  { pitch: N.E4, duration: 2 },
  { pitch: N.E4, duration: 1, bass: N.C3 },
  { pitch: N.G4, duration: 1 },
  { pitch: N.C4, duration: 1.5 },
  { pitch: N.D4, duration: 0.5 },
  { pitch: N.E4, duration: 3.5, bass: N.C3 },
  { pitch: N.F4, duration: 1, bass: N.F3 },
  { pitch: N.F4, duration: 1 },
  { pitch: N.F4, duration: 1.5 },
  { pitch: N.F4, duration: 0.5 },
  { pitch: N.F4, duration: 1, bass: N.F3 },
  { pitch: N.E4, duration: 1 },
  { pitch: N.E4, duration: 1 },
  { pitch: N.E4, duration: 0.5 },
  { pitch: N.E4, duration: 0.5 },
  { pitch: N.E4, duration: 1, bass: N.G3 },
  { pitch: N.D4, duration: 1 },
  { pitch: N.D4, duration: 1 },
  { pitch: N.E4, duration: 1 },
  { pitch: N.D4, duration: 2, bass: N.G3 },
  { pitch: N.G4, duration: 2 },
  { pitch: N.REST, duration: 1 },
];

const PLAYLIST = [WE_WISH_YOU, SILENT_NIGHT, JINGLE_BELLS];
const BEAT_DURATION_SEC = 0.38; // Tempo ~158 bpm in 3/4 or 4/4 feels like a gentle music box

function playChimeNote(ctx: AudioContext, targetGain: GainNode, freq: number, isBass = false) {
  if (freq <= 0) return;

  const now = ctx.currentTime;
  const noteDuration = isBass ? 1.6 : 1.2;

  // Music box crystal bell timbre: Fundamental + upper chime harmonic
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const chimeGain = ctx.createGain();

  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(freq, now);

  // Upper sparkling harmonic (celesta / chime bar overtone)
  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(freq * 2.004, now);

  // Envelope: Instant bell-strike attack followed by warm exponential decay
  const baseVol = isBass ? 0.08 : 0.16;
  chimeGain.gain.setValueAtTime(0.0001, now);
  chimeGain.gain.linearRampToValueAtTime(baseVol, now + 0.012);
  chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + noteDuration);

  // Connect
  osc1.connect(chimeGain);
  const osc2Gain = ctx.createGain();
  osc2Gain.gain.setValueAtTime(0.25, now);
  osc2.connect(osc2Gain);
  osc2Gain.connect(chimeGain);

  chimeGain.connect(targetGain);

  osc1.start(now);
  osc2.start(now);

  osc1.stop(now + noteDuration + 0.05);
  osc2.stop(now + noteDuration + 0.05);
}

function scheduleNextNote() {
  if (!isPlaying || !audioCtx || !masterGain) return;

  const currentSong = PLAYLIST[currentSongIndex];
  if (currentNoteIndex >= currentSong.length) {
    currentNoteIndex = 0;
    currentSongIndex = (currentSongIndex + 1) % PLAYLIST.length;
  }

  const note = PLAYLIST[currentSongIndex][currentNoteIndex];
  if (note && note.pitch > 0) {
    playChimeNote(audioCtx, masterGain, note.pitch, false);
    if (note.bass) {
      playChimeNote(audioCtx, masterGain, note.bass, true);
    }
  }

  const durationMs = Math.max(120, note.duration * BEAT_DURATION_SEC * 1000);
  currentNoteIndex++;

  playbackTimer = window.setTimeout(scheduleNextNote, durationMs);
}

export function toggleFireplaceAudio(volume = 0.28): boolean {
  if (typeof window === 'undefined') return false;

  const AudioContextClass =
    window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return false;

  if (isPlaying) {
    // Stop playback
    if (playbackTimer) {
      clearTimeout(playbackTimer);
      playbackTimer = null;
    }

    if (masterGain && audioCtx) {
      masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);
      setTimeout(() => {
        if (audioCtx && audioCtx.state !== 'closed') {
          audioCtx.suspend();
        }
      }, 400);
    }

    isPlaying = false;
    return false;
  }

  try {
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    } else if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(volume, audioCtx.currentTime + 0.8);
    masterGain.connect(audioCtx.destination);

    // Warm fireplace noise background
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.025; // soft cozy hearth
      b6 = white * 0.115926;
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(500, audioCtx.currentTime);

    const hearthGain = audioCtx.createGain();
    hearthGain.gain.setValueAtTime(0.04, audioCtx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(hearthGain);
    hearthGain.connect(masterGain);
    whiteNoise.start();
    fireplaceSource = whiteNoise;

    isPlaying = true;
    currentNoteIndex = 0;
    scheduleNextNote();

    return true;
  } catch (err) {
    console.warn('Could not start holiday audio:', err);
    isPlaying = false;
    return false;
  }
}

export function isAudioPlaying(): boolean {
  return isPlaying;
}

export const isFireplacePlaying = isAudioPlaying;

