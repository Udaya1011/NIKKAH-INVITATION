import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Calendar, Clock, MapPin, VolumeX } from 'lucide-react';

/* ─────────────────────────── SVG Components ─────────────────────────── */

const FloralCorner = ({ className, flip = false }) => (
  <svg viewBox="0 0 200 200" className={className} style={flip ? { transform: 'scaleX(-1)' } : {}}>
    <defs>
      <linearGradient id="petalGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#D4B5A0" />
        <stop offset="100%" stopColor="#C4A08A" />
      </linearGradient>
      <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8BA888" />
        <stop offset="100%" stopColor="#5C7A5A" />
      </linearGradient>
    </defs>
    {/* Rose petals */}
    <ellipse cx="40" cy="40" rx="30" ry="20" fill="url(#petalGrad)" opacity="0.7" transform="rotate(-30 40 40)" />
    <ellipse cx="55" cy="30" rx="25" ry="18" fill="url(#petalGrad)" opacity="0.6" transform="rotate(15 55 30)" />
    <ellipse cx="30" cy="55" rx="28" ry="16" fill="url(#petalGrad)" opacity="0.5" transform="rotate(-60 30 55)" />
    <ellipse cx="65" cy="50" rx="22" ry="14" fill="url(#petalGrad)" opacity="0.4" transform="rotate(30 65 50)" />
    <circle cx="45" cy="42" r="6" fill="#E8D5C8" opacity="0.8" />
    {/* Leaves */}
    <ellipse cx="90" cy="70" rx="20" ry="8" fill="url(#leafGrad)" opacity="0.6" transform="rotate(45 90 70)" />
    <ellipse cx="20" cy="85" rx="18" ry="7" fill="url(#leafGrad)" opacity="0.5" transform="rotate(-20 20 85)" />
    <ellipse cx="75" cy="25" rx="16" ry="6" fill="url(#leafGrad)" opacity="0.5" transform="rotate(60 75 25)" />
    {/* Small buds */}
    <ellipse cx="100" cy="40" rx="10" ry="8" fill="url(#petalGrad)" opacity="0.4" transform="rotate(20 100 40)" />
    <ellipse cx="15" cy="15" rx="12" ry="9" fill="url(#petalGrad)" opacity="0.3" transform="rotate(-45 15 15)" />
  </svg>
);

const GoldenLantern = ({ className }) => (
  <svg viewBox="0 0 60 120" className={`lantern-glow sway-anim ${className}`}>
    <defs>
      <linearGradient id="lanternGold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#E8D9B8" />
        <stop offset="50%" stopColor="#C5A365" />
        <stop offset="100%" stopColor="#8B6914" />
      </linearGradient>
    </defs>
    {/* Chain */}
    <line x1="30" y1="0" x2="30" y2="25" stroke="#C5A365" strokeWidth="1.5" />
    {/* Top cap */}
    <path d="M 20 25 L 40 25 L 38 30 L 22 30 Z" fill="url(#lanternGold)" />
    {/* Dome */}
    <path d="M 22 30 Q 30 20 38 30" fill="url(#lanternGold)" />
    {/* Body */}
    <rect x="18" y="30" width="24" height="50" rx="3" fill="url(#lanternGold)" opacity="0.9" />
    {/* Glass panels */}
    <rect x="21" y="33" width="7" height="20" rx="1" fill="#FFF8F0" opacity="0.5" />
    <rect x="32" y="33" width="7" height="20" rx="1" fill="#FFF8F0" opacity="0.5" />
    <rect x="21" y="57" width="7" height="20" rx="1" fill="#FFF8F0" opacity="0.5" />
    <rect x="32" y="57" width="7" height="20" rx="1" fill="#FFF8F0" opacity="0.5" />
    {/* Glow inside */}
    <ellipse cx="30" cy="55" rx="8" ry="15" fill="#C5A365" opacity="0.2" />
    {/* Bottom cap */}
    <path d="M 18 80 L 42 80 L 38 88 Q 30 95 22 88 Z" fill="url(#lanternGold)" />
    {/* Bottom point */}
    <path d="M 28 88 L 30 98 L 32 88" fill="url(#lanternGold)" />
  </svg>
);

const FloralDivider = () => (
  <div className="flex items-center justify-center gap-4 my-6">
    <div className="h-[1px] w-16 md:w-24 bg-gradient-to-r from-transparent to-[#C4A08A]/40" />
    <svg viewBox="0 0 40 20" className="w-10 h-5 text-[#C4A08A]">
      <ellipse cx="20" cy="10" rx="8" ry="6" fill="currentColor" opacity="0.3" />
      <ellipse cx="12" cy="10" rx="6" ry="5" fill="currentColor" opacity="0.2" transform="rotate(-20 12 10)" />
      <ellipse cx="28" cy="10" rx="6" ry="5" fill="currentColor" opacity="0.2" transform="rotate(20 28 10)" />
      <circle cx="20" cy="10" r="2" fill="currentColor" opacity="0.5" />
    </svg>
    <div className="h-[1px] w-16 md:w-24 bg-gradient-to-l from-transparent to-[#C4A08A]/40" />
  </div>
);

const FallingPetals = () => {
  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 10}s`,
    duration: `${8 + Math.random() * 6}s`,
    size: 8 + Math.random() * 12,
    opacity: 0.15 + Math.random() * 0.25,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map(p => (
        <div
          key={p.id}
          className="absolute petal-fall"
          style={{
            left: p.left,
            '--delay': p.delay,
            '--duration': p.duration,
          }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 20 20">
            <ellipse cx="10" cy="10" rx="8" ry="5" fill="#C4A08A" opacity={p.opacity} transform="rotate(30 10 10)" />
          </svg>
        </div>
      ))}
    </div>
  );
};

const DoubleHeartMerge = ({ className }) => {
  return (
    <svg
      viewBox="0 0 240 70"
      className={className}
      style={{ overflow: 'visible' }}
      fill="none"
      stroke="currentColor"
    >
      <defs>
        <linearGradient id="heartGoldGradient" x1="0" y1="0" x2="240" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C4A08A" />
          <stop offset="30%" stopColor="#E8D5C8" />
          <stop offset="50%" stopColor="#C5A365" />
          <stop offset="70%" stopColor="#E8D5C8" />
          <stop offset="100%" stopColor="#C4A08A" />
        </linearGradient>
        <linearGradient id="heartGoldGradientFill" x1="0" y1="0" x2="240" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(196, 160, 138, 0.02)" />
          <stop offset="50%" stopColor="rgba(232, 213, 200, 0.15)" />
          <stop offset="100%" stopColor="rgba(197, 163, 101, 0.02)" />
        </linearGradient>
      </defs>

      <circle cx="10" cy="35" r="2.5" fill="url(#heartGoldGradient)" />
      <circle cx="230" cy="35" r="2.5" fill="url(#heartGoldGradient)" />

      <motion.path
        d="M 10,35 L 100,35"
        stroke="url(#heartGoldGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1, 1, 1, 0], opacity: [0, 1, 0, 0, 0] }}
        transition={{ duration: 8, repeat: Infinity, times: [0, 0.1125, 0.1875, 0.9875, 1], ease: "easeInOut" }}
      />

      <motion.path
        d="M 230,35 L 140,35"
        stroke="url(#heartGoldGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1, 1, 1, 0], opacity: [0, 1, 0, 0, 0] }}
        transition={{ duration: 8, repeat: Infinity, times: [0, 0.1125, 0.1875, 0.9875, 1], ease: "easeInOut" }}
      />

      <motion.g
        animate={{ scale: [1, 1.05, 1, 1.03, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "120px 35px" }}
      >
        <motion.path
          d="M 0 10 C -10 -5, -25 5, -25 20 C -25 35, -5 50, 0 55 C 5 50, 25 35, 25 20 C 25 5, 10 -5, 0 10 Z"
          transform="translate(106, 12) rotate(-12) scale(0.65)"
          stroke="url(#heartGoldGradient)" strokeWidth="3" fill="url(#heartGoldGradientFill)"
          strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0, fillOpacity: 0, opacity: 0 }}
          animate={{ pathLength: [0, 0, 1, 1, 1, 1, 0], fillOpacity: [0, 0, 0, 1, 1, 0, 0], opacity: [0, 0, 1, 1, 1, 0, 0] }}
          transition={{ duration: 8, repeat: Infinity, times: [0, 0.125, 0.275, 0.375, 0.875, 0.975, 1], ease: "easeInOut" }}
        />
        <motion.path
          d="M 0 10 C -10 -5, -25 5, -25 20 C -25 35, -5 50, 0 55 C 5 50, 25 35, 25 20 C 25 5, 10 -5, 0 10 Z"
          transform="translate(130, 20) rotate(12) scale(0.52)"
          stroke="url(#heartGoldGradient)" strokeWidth="3" fill="url(#heartGoldGradientFill)"
          strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0, fillOpacity: 0, opacity: 0 }}
          animate={{ pathLength: [0, 0, 1, 1, 1, 1, 0], fillOpacity: [0, 0, 0, 1, 1, 0, 0], opacity: [0, 0, 1, 1, 1, 0, 0] }}
          transition={{ duration: 8, repeat: Infinity, times: [0, 0.125, 0.275, 0.375, 0.875, 0.975, 1], ease: "easeInOut" }}
        />
      </motion.g>
    </svg>
  );
};

/* ─────────────────────────── Envelope Screen ─────────────────────────── */

const EnvelopeScreen = ({ onOpen, onPlayMusic, onDownload }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    if (onPlayMusic) onPlayMusic();
    if (onDownload) onDownload();
    setTimeout(() => { onOpen(); }, 1500);
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 bg-[#FFF8F0] z-[9999] flex items-center justify-center overflow-hidden"
    >
      {/* Background florals */}
      <FloralCorner className="absolute top-0 left-0 w-32 md:w-48 opacity-50" />
      <FloralCorner className="absolute top-0 right-0 w-32 md:w-48 opacity-50" flip />
      <FloralCorner className="absolute bottom-0 left-0 w-32 md:w-48 opacity-30 rotate-180" flip />
      <FloralCorner className="absolute bottom-0 right-0 w-32 md:w-48 opacity-30 rotate-180" />

      <motion.div
        animate={isOpen ? { y: 200, scale: 0.9, opacity: 0 } : { y: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
        className="relative w-[320px] h-[220px] md:w-[450px] md:h-[300px]"
      >
        {/* Envelope Base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5EDE3] to-[#E8D5C8] rounded-lg shadow-[0_10px_40px_rgba(196,160,138,0.3)] border border-[#C4A08A]/30" />

        {/* Letter Inside */}
        <motion.div
          animate={isOpen ? { y: -300, scale: 1.1, opacity: 0, rotate: -2 } : { y: 0, scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-x-4 top-4 bottom-4 bg-white rounded flex flex-col items-center justify-center z-10 border border-[#C4A08A]/20"
        >
          <div className="w-12 h-12 rounded-full border border-[#C4A08A]/30 mb-3 flex items-center justify-center bg-[#FFF8F0]">
            <Heart className="w-5 h-5 text-[#C4A08A] fill-[#C4A08A]/20" />
          </div>
          <div className="w-16 h-[1px] bg-[#C4A08A]/40 mb-3" />
          <p className="text-[#3A2E28] font-serif italic text-sm tracking-widest">Nikkah Invitation</p>
        </motion.div>

        {/* Front Cover */}
        <div className="absolute inset-0 z-20 pointer-events-none rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#E8D5C8] to-[#D4B5A0] [clip-path:polygon(0_0,0_100%,100%_100%,100%_0,50%_60%)] shadow-xl" />
          <div className="absolute inset-0 border border-[#C4A08A]/20 rounded-lg" />
        </div>

        {/* Top Flap */}
        <motion.div
          initial={{ rotateX: 0 }}
          animate={{ rotateX: isOpen ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
          className="absolute top-0 left-0 right-0 h-[60%] z-30"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#D4B5A0] to-[#C4A08A] [clip-path:polygon(0_0,100%_0,50%_100%)] shadow-2xl" />
          <div className="absolute inset-0 [clip-path:polygon(0_0,100%_0,50%_100%)] border-b border-white/20" />

          {/* Wax Seal */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-40">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              disabled={isOpen}
              className="relative w-14 h-14 flex items-center justify-center cursor-pointer pointer-events-auto"
            >
              <div className="absolute inset-0 bg-[#C4A08A] opacity-30 rounded-full scale-[1.25] heartbeat" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#E8D5C8] via-[#C4A08A] to-[#9E7B6B] rounded-full shadow-lg border border-white/30" />
              <Heart className="relative z-10 w-5 h-5 text-white fill-white drop-shadow-sm" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────────────── Main App ─────────────────────────── */

function App() {
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [countdown, setCountdown] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);

  const [audio] = useState(() => {
    const sound = new Audio('/_Enthaaraa_Enthaaraa_Thirumanam_Enum_Nikkah_Ringtone_(by Fringster.com).mp3');
    sound.loop = true;
    return sound;
  });
  const [isPlaying, setIsPlaying] = useState(false);

  const startMusic = () => {
    audio.play().then(() => setIsPlaying(true)).catch(err => console.log("Audio play failed:", err));
  };

  const toggleMusic = () => {
    if (isPlaying) { audio.pause(); setIsPlaying(false); }
    else { audio.play().then(() => setIsPlaying(true)).catch(err => console.log("Audio play failed:", err)); }
  };

  useEffect(() => { return () => { audio.pause(); }; }, [audio]);

  const triggerDownload = () => {
    const link = document.createElement('a');
    link.download = 'Nawazudin_Weds_Irfana_Invitation.jpeg';
    link.href = '/nikkah.jpeg';
    // Append to body to ensure the click works in all browsers
    document.body.appendChild(link);
    link.click();
    // Clean up
    document.body.removeChild(link);
  };

  const handleHeartButtonClick = () => {
    setShowHeartAnimation(true);
    setTimeout(() => setShowHeartAnimation(false), 1200);
    triggerDownload();
  };

  const calendarEvent = {
    title: 'Muhammad Nawazudin & Irfana Begam — Nikkah',
    details: 'Nikkah Ceremony at MSJM Mahal, Mangalam, Tiruppur',
    location: 'MSJM Mahal, Mangalam, Tiruppur',
    start: '20260628T060000Z',
    end: '20260628T090000Z',
  };

  const openGoogleCalendar = () => {
    const params = new URLSearchParams({
      action: 'TEMPLATE', text: calendarEvent.title,
      dates: `${calendarEvent.start}/${calendarEvent.end}`,
      details: calendarEvent.details, location: calendarEvent.location,
    });
    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, '_blank');
  };

  useEffect(() => {
    if (showEnvelope) return;

    const weddingDate = new Date('2026-06-28T11:30:00+05:30');
    const updateCountdown = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();
      if (difference <= 0) { setCountdown({ days: '00', hours: '00', minutes: '00', seconds: '00' }); return; }
      setCountdown({
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0'),
        hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
        minutes: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, '0'),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
      });
    };
    updateCountdown();
    const countdownTimer = setInterval(updateCountdown, 1000);

    const lenis = new Lenis({ lerp: 0.05, duration: 1.5, smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);

    return () => { clearInterval(countdownTimer); lenis.destroy(); window.removeEventListener('mousemove', handleMouseMove); };
  }, [showEnvelope]);

  return (
    <div className="bg-[#FFF8F0] min-h-screen text-[#3A2E28] font-sans relative overflow-x-hidden z-10">
      <AnimatePresence>
        {showEnvelope && (
          <EnvelopeScreen onOpen={() => setShowEnvelope(false)} onPlayMusic={startMusic} onDownload={triggerDownload} />
        )}
      </AnimatePresence>

      {/* Falling Petals */}
      {!showEnvelope && <FallingPetals />}

      {/* Premium Floating Music Player */}
      {!showEnvelope && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, type: "spring", stiffness: 100 }}
          className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[8000] flex items-center gap-2 sm:gap-3 bg-white/90 backdrop-blur-md border border-[#C4A08A]/30 pl-2 sm:pl-3 pr-3 sm:pr-4 py-1.5 sm:py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 select-none"
        >
          {/* Rotating Vinyl/Record Disk */}
          <motion.div
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={isPlaying ? { repeat: Infinity, duration: 6, ease: "linear" } : { duration: 0.5 }}
            onClick={toggleMusic}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#3A2E28] to-[#6B5B52] flex items-center justify-center cursor-pointer shadow-md relative"
          >
            {/* Vinyl grooves */}
            <div className="absolute inset-1 rounded-full border border-white/10 pointer-events-none" />
            <div className="absolute inset-2 rounded-full border border-white/5 pointer-events-none" />
            {/* Center label */}
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#E8D5C8] border border-[#C4A08A]/50 flex items-center justify-center pointer-events-none">
              <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-[#3A2E28]" />
            </div>
          </motion.div>

          {/* Music Text Info (Hidden on Mobile for Compactness) */}
          <div className="hidden sm:flex flex-col pr-1 cursor-pointer" onClick={toggleMusic}>
            <span className="text-[9px] uppercase tracking-[0.15em] text-[#C4A08A] font-semibold leading-none mb-1">
              Background Music
            </span>
            <span className="text-[10px] text-[#3A2E28] font-medium leading-none max-w-[80px] md:max-w-[120px] truncate">
              {isPlaying ? "Nikkah Background Nasheed" : "Music Paused"}
            </span>
          </div>

          {/* Equalizer Wave / Mute Icon */}
          <div className="flex items-center gap-1.5 sm:gap-2 border-l border-[#C4A08A]/20 pl-1.5 sm:pl-2">
            {isPlaying ? (
              <div className="flex items-end justify-center gap-[2px] sm:gap-[2.5px] h-3 sm:h-3.5 pb-[2px] w-5 sm:w-6 cursor-pointer" onClick={toggleMusic}>
                <span className="w-[2px] sm:w-[2.5px] h-1.5 sm:h-2 bg-[#C4A08A] rounded-full sound-wave-bar sound-wave-bar-1" />
                <span className="w-[2px] sm:w-[2.5px] h-2.5 sm:h-3.5 bg-[#C4A08A] rounded-full sound-wave-bar sound-wave-bar-2" />
                <span className="w-[2px] sm:w-[2.5px] h-1 sm:h-1.5 bg-[#C4A08A] rounded-full sound-wave-bar sound-wave-bar-3" />
                <span className="w-[2px] sm:w-[2.5px] h-2 sm:h-3 bg-[#C4A08A] rounded-full sound-wave-bar sound-wave-bar-4" />
              </div>
            ) : (
              <button
                onClick={toggleMusic}
                className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-[#6B5B52] hover:text-[#C4A08A] transition-colors duration-300 cursor-pointer"
              >
                <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* Floating Download Heart Button */}
      {!showEnvelope && (
        <>
          <AnimatePresence>
            {showHeartAnimation && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }} transition={{ duration: 0.6, ease: 'easeOut' }}
                className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[7999] w-12 h-12 sm:w-14 sm:h-14"
              >
                <div className="absolute inset-0 rounded-full bg-[#C4A08A]/20 blur-xl" />
                {[{ y: -50, x: 0, size: 4, dur: 1 }, { y: -24, x: -24, size: 3, dur: 0.8 }, { y: -18, x: 24, size: 3, dur: 0.8 }].map((h, i) => (
                  <motion.span key={i}
                    initial={{ x: 0, y: 0, opacity: 0 }}
                    animate={{ x: h.x, y: h.y, opacity: [0, 1, 0] }}
                    transition={{ duration: h.dur, ease: 'easeOut' }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#C4A08A]"
                  >
                    <Heart className={`w-${h.size} h-${h.size}`} />
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: 2, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={handleHeartButtonClick}
            className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[8000] w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#D4B5A0] to-[#C4A08A] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(196,160,138,0.4)] border border-white/30 cursor-pointer"
          >
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white heartbeat" />
          </motion.button>
        </>
      )}

      {/* Custom Cursor (Desktop) */}
      {!showEnvelope && (
        <motion.div
          className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#C4A08A]/40 pointer-events-none z-[9000] mix-blend-multiply items-center justify-center hidden md:flex"
          animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
          transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
        >
          <div className="w-1 h-1 bg-[#C4A08A] rounded-full" />
        </motion.div>
      )}

      {/* ═══════════════════════ HERO SECTION ═══════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-start pt-0 pb-12 overflow-hidden">
        {/* Floral decorations at top */}
        <div className="absolute top-0 left-0 right-0 flex justify-between pointer-events-none z-10">
          <FloralCorner className="w-36 md:w-56 -ml-4 -mt-4" />
          <FloralCorner className="w-36 md:w-56 -mr-4 -mt-4" flip />
        </div>

        {/* Golden Lanterns */}
        <div className="absolute top-0 left-1/4 pointer-events-none z-10">
          <GoldenLantern className="w-10 md:w-14" />
        </div>
        <div className="absolute top-0 right-1/4 pointer-events-none z-10" style={{ animationDelay: '1s' }}>
          <GoldenLantern className="w-10 md:w-14" />
        </div>

        <div className="z-20 flex flex-col items-center mt-20 md:mt-28 px-4">
          {/* Bismillah */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="text-center mb-4"
          >
            <p className="font-arabic text-3xl md:text-4xl text-[#6B5B52] leading-relaxed" style={{ fontFamily: "'Amiri', serif" }}>
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </p>
          </motion.div>

          <FloralDivider />

          {/* Invitation text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-center mb-8"
          >
            <p className="text-[#C4A08A] text-sm md:text-base italic font-serif tracking-wide leading-relaxed">
              we invite you to the<br />Nikaah ceremony of
            </p>
          </motion.div>

          {/* Photo with arch frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="w-56 h-72 md:w-80 md:h-[26rem] relative blush-border p-2 glass-panel rounded-t-full mb-8 shadow-md"
          >
            <div className="w-full h-full relative overflow-hidden rounded-t-full">
              <img
                src="/hero.jpg"
                alt="Muhammad Nawazudin & Irfana Begam"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F0]/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Couple Names */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.9 }}
            className="text-center flex flex-col items-center"
          >
            <h1 className="text-3xl md:text-5xl font-serif leading-none tracking-tight flex flex-col items-center mb-2">
              <span className="text-gold-gradient inline-block px-4 pb-2">Muhammad Nawazudin</span>
              <motion.div
                animate={{
                  y: [0, -6, 0],
                  filter: [
                    "drop-shadow(0 0 8px rgba(196,160,138,0.2))",
                    "drop-shadow(0 0 18px rgba(196,160,138,0.5))",
                    "drop-shadow(0 0 8px rgba(196,160,138,0.2))"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="my-2 flex items-center justify-center w-48 md:w-80 max-w-full overflow-visible"
              >
                <DoubleHeartMerge className="w-full h-auto text-[#C4A08A]" />
              </motion.div>
              <span className="text-gold-gradient inline-block px-4 pb-2">Irfana Begam</span>
            </h1>
          </motion.div>

          <FloralDivider />

          {/* Date, Time & Venue Luxury Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="w-[92%] max-w-sm md:max-w-md mx-auto glass-panel blush-border p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-xl mt-6 mb-8 text-center relative overflow-hidden"
          >
            {/* Elegant double border outline */}
            <div className="absolute inset-2 border border-[#C4A08A]/25 rounded-[16px] md:rounded-[22px] pointer-events-none" />
            <div className="absolute inset-[6px] md:inset-[8px] border border-[#C4A08A]/10 rounded-[12px] md:rounded-[18px] pointer-events-none" />

            {/* Micro Floral Corners inside the card */}
            <FloralCorner className="absolute top-2.5 left-2.5 w-6 h-6 opacity-30 pointer-events-none" />
            <FloralCorner className="absolute top-2.5 right-2.5 w-6 h-6 opacity-30 pointer-events-none" flip />
            <FloralCorner className="absolute bottom-2.5 left-2.5 w-6 h-6 opacity-20 pointer-events-none rotate-180" flip />
            <FloralCorner className="absolute bottom-2.5 right-2.5 w-6 h-6 opacity-20 pointer-events-none rotate-180" />

            {/* Header Callout */}
            <div className="relative z-10 font-script text-3xl md:text-4xl text-[#C4A08A] mb-0.5 mt-2">
              Save the Date
            </div>

            {/* Tiny flourish separator */}
            <div className="relative z-10 flex items-center justify-center gap-1.5 my-1.5">
              <div className="h-[1px] w-6 bg-[#C4A08A]/35" />
              <Heart className="w-2 h-2 text-[#C4A08A]/60 fill-[#C4A08A]/40" />
              <div className="h-[1px] w-6 bg-[#C4A08A]/35" />
            </div>

            <div className="relative z-10 text-[8px] md:text-[9px] tracking-[0.4em] uppercase text-[#6B5B52] mb-4 font-semibold">
              Nikkah Ceremony
            </div>

            {/* Elegant horizontal split with nested tactile card modules */}
            <div className="relative z-10 flex items-stretch justify-center gap-2 md:gap-3 py-3 border-y border-[#C4A08A]/20">
              {/* Day Sub-Card */}
              <div className="flex-1 text-center py-2 px-1 rounded-xl bg-[#FFF8F0]/40 border border-[#C4A08A]/10 flex flex-col justify-center">
                <span className="block text-[8px] uppercase tracking-widest text-[#6B5B52] mb-0.5">Day</span>
                <span className="font-serif text-xs md:text-sm text-[#3A2E28] font-bold">Sunday</span>
              </div>

              <div className="flex-1 flex flex-col items-center py-1.5 px-2 rounded-xl bg-[#FFF8F0]/75 border border-[#C4A08A]/20 shadow-inner">
                <span className="block text-[8px] uppercase tracking-widest text-[#6B5B52] mb-0.5">June</span>
                <span className="font-serif text-2xl md:text-3xl font-extrabold text-gold-gradient leading-none">28</span>
                <span className="block text-[8px] tracking-[0.1em] text-[#3A2E28] font-bold mt-0.5 uppercase">2026</span>
              </div>

              {/* Time Sub-Card */}
              <div className="flex-1 text-center py-2 px-1 rounded-xl bg-[#FFF8F0]/40 border border-[#C4A08A]/10 flex flex-col justify-center">
                <span className="block text-[8px] uppercase tracking-widest text-[#6B5B52] mb-0.5">Time</span>
                <span className="font-serif text-xs md:text-sm text-[#3A2E28] font-bold">11:30 AM</span>
              </div>
            </div>

            {/* Venue info nested inside with a card frame container */}
            <div className="relative z-10 mt-5 flex flex-col items-center bg-[#FFF8F0]/40 p-4 rounded-xl border border-[#C4A08A]/10">
              <div className="w-8 h-8 rounded-full border border-[#C4A08A]/35 flex items-center justify-center mb-2.5 bg-white shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-[#C4A08A] fill-[#C4A08A]/10" />
              </div>
              <p className="font-serif text-base md:text-lg text-[#3A2E28] font-bold tracking-wide leading-snug">
                MSJM Mahal
              </p>
              <p className="text-[10px] md:text-xs text-[#6B5B52] tracking-wider mt-1 font-medium">
                Mangalam, Tiruppur
              </p>
            </div>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="mt-4 w-full max-w-md mx-auto"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#6B5B52] mb-4 text-center">Countdown to the Nikkah</p>
            <div className="grid grid-cols-4 gap-3 text-center">
              {[
                { val: countdown.days, label: 'Days' },
                { val: countdown.hours, label: 'Hours' },
                { val: countdown.minutes, label: 'Minutes' },
                { val: countdown.seconds, label: 'Seconds' },
              ].map(item => (
                <div key={item.label} className="rounded-2xl border border-[#C4A08A]/20 bg-white/60 backdrop-blur-sm p-4 shadow-sm">
                  <p className="text-3xl md:text-4xl font-semibold text-[#3A2E28]">{item.val}</p>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-[#6B5B52] mt-2">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom florals */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between pointer-events-none z-10 rotate-180">
          <FloralCorner className="w-28 md:w-40 -ml-2 -mt-2 opacity-40" />
          <FloralCorner className="w-28 md:w-40 -mr-2 -mt-2 opacity-40" flip />
        </div>
      </section>

      {/* ═══════════════════════ QURANIC VERSE SECTION ═══════════════════════ */}
      <section className="py-12 px-4 relative z-10 w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="w-[92%] max-w-2xl glass-panel blush-border p-5 md:p-12 rounded-2xl md:rounded-3xl shadow-xl text-center relative overflow-hidden"
        >
          {/* Inner double border */}
          <div className="absolute inset-2 md:inset-3 border border-[#C4A08A]/15 rounded-[16px] md:rounded-[20px] pointer-events-none" />

          {/* Subtle floral accents inside the card */}
          <FloralCorner className="absolute -top-4 -left-4 w-20 opacity-20" />
          <FloralCorner className="absolute -top-4 -right-4 w-20 opacity-20" flip />

          {/* Quranic Verse Callout */}
          <p className="font-arabic text-2xl md:text-3xl text-[#6B5B52] leading-relaxed mb-6" style={{ fontFamily: "'Amiri', serif" }}>
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </p>

          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4A08A]/60 to-transparent mx-auto mb-6" />

          <p className="font-serif italic text-base md:text-lg text-[#3A2E28] leading-relaxed max-w-xl mx-auto">
            "And among His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy."
          </p>

          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C4A08A] font-semibold mt-4">
            Surah Ar-Rum — 30:21
          </p>
        </motion.div>
      </section>

      {/* ═══════════════════════ MAP SECTION ═══════════════════════ */}
      <section className="py-16 px-4 relative z-10 w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="w-full max-w-4xl glass-panel blush-border p-2 rounded-2xl shadow-lg"
        >
          <div className="w-full h-[350px] bg-[#F5EDE3] relative overflow-hidden rounded-t-xl">
            <iframe
              width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"
              title="Nikkah Location"
              src="https://maps.google.com/maps?q=MSJM+Mahal+Mangalam+Tiruppur&t=&z=15&ie=UTF8&iwloc=&output=embed"
              style={{ filter: "saturate(0.8) contrast(0.9)" }}
            ></iframe>
          </div>
          <div className="p-8 text-center flex flex-col items-center">
            <p className="text-[#6B5B52] text-xs md:text-sm tracking-[0.2em] uppercase leading-relaxed mb-6">
              MSJM Mahal<br />Mangalam, Tiruppur
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=MSJM+Mahal+Mangalam+Tiruppur"
              target="_blank" rel="noreferrer"
              className="px-8 py-3 border border-[#C4A08A]/40 text-[#3A2E28] text-[10px] uppercase tracking-[0.3em] hover:bg-[#C4A08A] hover:text-white transition-all duration-500 rounded-full"
            >
              Open in Google Maps
            </a>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════ RSVP SECTION ═══════════════════════ */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-2xl mx-auto glass-panel blush-border p-12 text-center rounded-2xl shadow-lg relative overflow-hidden">
          <FloralCorner className="absolute top-0 left-0 w-20 opacity-20" />
          <FloralCorner className="absolute top-0 right-0 w-20 opacity-20" flip />

          <p className="tracking-[0.4em] text-[10px] uppercase text-[#6B5B52] mb-4">Join Us</p>
          <h2 className="text-3xl md:text-4xl font-serif text-[#3A2E28] mb-8">Will you be there?</h2>

          <div className="space-y-4 relative z-10">
            <button onClick={openGoogleCalendar}
              className="w-full py-4 border border-[#C4A08A] text-[#3A2E28] tracking-[0.2em] text-xs uppercase hover:bg-[#C4A08A] hover:text-white transition-all duration-500 rounded-full cursor-pointer"
            >
              Add to Google Calendar
            </button>
            <button onClick={() => {
              const message = encodeURIComponent(
                `✧ *NIKKAH CEREMONY INVITATION* ✧\n` +
                `━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
                `*Muhammad Nawazudin*\n` +
                `&\n` +
                `*Irfana Begam*\n\n` +
                `*View Web Invitation:* ${window.location.href}\n\n` +
                `_“Your presence and prayers will make our day even more special.”_`
              );
              window.open(`https://wa.me/?text=${message}`, '_blank');
            }}
              className="w-full py-4 border border-[#C4A08A] text-[#3A2E28] tracking-[0.2em] text-xs uppercase hover:bg-[#C4A08A] hover:text-white transition-all duration-500 rounded-full cursor-pointer"
            >
              Share on WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FOOTER ═══════════════════════ */}
      <footer className="py-12 text-center relative overflow-hidden">
        <FloralDivider />
        <p className="text-[#6B5B52] text-[10px] tracking-[0.3em] uppercase mt-4">
          Muhammad Nawazudin & Irfana Begam
        </p>
        <p className="text-[#C4A08A] text-[9px] tracking-[0.2em] mt-2">28 June 2026</p>
      </footer>
    </div>
  );
}

export default App;
