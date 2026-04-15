import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, MapPinned, Camera, Gift } from 'lucide-react';

export default function SpeedDial() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleOpen = () => setIsOpen(!isOpen);

  const navItems = [
    { id: 'home', path: '/', icon: <Map size={26} /> },
    { id: 'collection', path: '/collection', icon: <MapPinned size={26} /> },
    { id: 'reward', path: '/reward', icon: <Gift size={26} /> },
    { id: 'scanner', path: '/scanner', icon: <Camera size={26} /> }
  ];

  return (
    <>
      {/* Soft overlay backdrop linking to the watercolor vibe */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-[#e0dbcd]/40 backdrop-blur-[2px] z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
      
      <div className="absolute bottom-6 right-6 z-50 flex flex-col items-center pointer-events-none">
        
        {/* Animated Pop-out Menu Items */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="flex flex-col-reverse items-center gap-4 mb-5 pointer-events-auto"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.08, delayChildren: 0.02 } },
                closed: { transition: { staggerChildren: 0.06, staggerDirection: -1 } }
              }}
            >
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.button
                    key={item.id}
                    variants={{
                      open: { 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        transition: { type: 'spring', stiffness: 350, damping: 15, mass: 0.8 } 
                      },
                      closed: { 
                        opacity: 0, 
                        y: 15, 
                        scale: 0.6,
                        transition: { duration: 0.15 } 
                      }
                    }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      navigate(item.path);
                      setIsOpen(false);
                    }}
                    className={`w-[3.25rem] h-[3.25rem] rounded-full flex items-center justify-center relative shadow-[0_8px_20px_rgba(40,30,20,0.15)] border-2 transition-colors duration-300
                      ${isActive 
                        ? 'bg-[#ffffff] border-[#d5ccbe] text-[#3e342b]' 
                        : 'bg-[#fdfaf5]/80 backdrop-blur-md border-white/60 text-[#a39585]'
                      }`}
                  >
                    {item.icon}
                    
                    {/* Active Indicator Dot */}
                    {isActive && (
                      <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-[#8a7a6b] border-2 border-white shadow-sm" />
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Button (Main) */}
        <motion.button 
          onClick={toggleOpen}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 250, damping: 20 }}
          className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#685b4f] to-[#8a7a6b] text-[#fdfaf5] shadow-[0_12px_30px_rgba(50,40,30,0.25)] border-2 border-[#e0dbcd]/50 z-50 pointer-events-auto"
        >
          <motion.div 
            animate={{ rotate: isOpen ? 135 : 0 }}
            transition={{ type: 'spring', stiffness: 250, damping: 20 }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </motion.div>
        </motion.button>

      </div>
    </>
  );
}
