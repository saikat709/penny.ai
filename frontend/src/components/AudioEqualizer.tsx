import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function AudioEqualizer({ isActive = false }) {
  const [barHeights, setBarHeights] = useState([]);

  return (
    <div className="flex items-end justify-center h-20 space-x-[1px]">
      {barHeights.map((height, index) => (
        <motion.div
          key={index}
          className="equalizer-bar"
          animate={{ 
            height: `${height * 100}%`,
            opacity: isActive ? 1 : 0.4
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
        />
      ))}
    </div>
  );
} 