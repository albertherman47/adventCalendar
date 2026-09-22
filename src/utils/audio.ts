// Self-contained ambient fireplace & holiday acoustic sound generator using Web Audio API
// No external MP3 dependencies, reliable in any browser, zero network lag

let audioCtx: AudioContext | null = null;
let fireNoiseNode: AudioNode | null = null;
let gainNode: GainNode | null = null;
let isPlaying = false;

export function toggleFireplaceAudio(volume = 0.2): boolean {
  if (typeof window === 'undefined') return false;

  const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return false;

  if (isPlaying) {
    if (gainNode) {
      gainNode.gain.setValueAtTime(gainNode.gain.value, audioCtx!.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx!.currentTime + 0.5);
      setTimeout(() => {
        if (audioCtx && audioCtx.state !== 'closed') {
          audioCtx.suspend();
        }
      }, 500);
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

    // Create pink noise buffer for warm hearth crackle
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
      output[i] *= 0.05; // lower volume baseline
      b6 = white * 0.115926;
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to warm bass / low-mid frequencies like a crackling hearth
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(650, audioCtx.currentTime);

    // Warm sub-drone oscillator for gentle room warmth
    const warmTone = audioCtx.createOscillator();
    warmTone.type = 'sine';
    warmTone.frequency.setValueAtTime(110, audioCtx.currentTime); // A2 warm harmonic
    const warmToneGain = audioCtx.createGain();
    warmToneGain.gain.setValueAtTime(0.015, audioCtx.currentTime);

    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(volume, audioCtx.currentTime + 1.2);

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    warmTone.connect(warmToneGain);
    warmToneGain.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    whiteNoise.start();
    warmTone.start();

    fireNoiseNode = gainNode;
    isPlaying = true;
    return true;
  } catch (err) {
    console.warn('Could not start ambient audio:', err);
    isPlaying = false;
    return false;
  }
}

export function isAudioPlaying(): boolean {
  return isPlaying;
}

export const isFireplacePlaying = isAudioPlaying;
