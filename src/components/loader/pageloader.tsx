import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ShatterLoader: React.FC = () => {
  const gridSize = 3; // 3x3 grid
  const [pieces, setPieces] = useState<{ id: number; x: number; y: number }[]>(
    []
  );
  const [reveal, setReveal] = useState(false);
  const [shatterComplete, setShatterComplete] = useState(false); // Track if shatter is complete
  const [reverseShatter, setReverseShatter] = useState(false); // Track reverse shatter

  useEffect(() => {
    // Generate positions for fragments
    const tempPieces = Array.from({ length: gridSize * gridSize }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 200, // Move outward randomly
      y: (Math.random() - 0.5) * 200,
    }));
    setPieces(tempPieces);

    // Set reveal state to true after a delay to trigger the rotation
    const revealTimeout = setTimeout(() => {
      setReveal(true);
    }, 2000); // Delay after shatter for smooth transition

    // Set shatterComplete to true once pieces are done
    const shatterTimeout = setTimeout(() => {
      setShatterComplete(true);
    }, 4000); // Delay until shatter animation is complete

    // Reverse the shatter effect after the spin
    const reverseShatterTimeout = setTimeout(() => {
      setReverseShatter(true); // Start the reverse shatter
    }, 6000); // Wait for spin to complete before starting reverse shatter

    // Reset and loop the effect
    const loopTimeout = setTimeout(() => {
      setReveal(false);
      setShatterComplete(false);
      setReverseShatter(false);
    }, 8000); // Wait for the full cycle (shatter + reveal + reverse)

    // Clean up timeouts
    return () => {
      clearTimeout(revealTimeout);
      clearTimeout(shatterTimeout);
      clearTimeout(reverseShatterTimeout);
      clearTimeout(loopTimeout);
    };
  }, [shatterComplete]); // Re-run when shatterComplete changes

  const shatterVariants = {
    hidden: (piece?: { x: number; y: number }) => ({
      opacity: reverseShatter ? 0 : 1, // Fade out after reverse shatter
      scale: reverseShatter ? 0.5 : 1, // Shrink pieces when reversing
      x: piece?.x ?? 0, // Use default values to prevent errors
      y: piece?.y ?? 0,
      rotate: Math.random() * 360,
    }),
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotate: 0,
      transition: { duration: 1.8, ease: 'easeInOut', staggerChildren: 0.15 },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: reveal ? 180 : 0, // 3D rotation on Y-axis after shatter
      transition: {
        duration: 2,
        ease: 'easeInOut',
        delay: 0.1, // Delay the rotation after shattering effect completes
      },
    },
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      {!shatterComplete && (
        <motion.div
          className="relative w-40 h-40 flex flex-wrap"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {pieces.map((piece, i) => {
            const row = Math.floor(i / gridSize);
            const col = i % gridSize;
            return (
              <motion.div
                key={piece.id}
                custom={piece} // Pass piece object explicitly
                initial="hidden"
                animate="visible"
                variants={shatterVariants}
                className="absolute w-1/3 h-1/3 bg-contain"
                style={{
                  backgroundImage: `url('/images/logo2.png')`, // Replace with actual logo path
                  backgroundPosition: `${-col * 100}% ${-row * 100}%`,
                  backgroundSize: '300% 300%',
                  top: `${row * 33.33}%`,
                  left: `${col * 33.33}%`,
                }}
              />
            );
          })}
        </motion.div>
      )}

      {/* 3D logo container (Only appears after shattering) */}
      {shatterComplete && (
        <motion.div
          className="absolute w-40 h-40 flex justify-center items-center"
          initial="hidden"
          animate="visible"
          variants={logoVariants}
        >
          <img
            src="/images/logo2.png"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </motion.div>
      )}
    </div>
  );
};

export default ShatterLoader;
