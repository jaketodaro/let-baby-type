import { motion } from 'framer-motion';
import React, { useRef } from 'react';

const chars = ['★', '✦', '✢', '✿', '❀', '❁', '✾', '❄'];

function randomChar() {
  const index = Math.floor(Math.random() * chars.length);
  return chars[index] ?? chars[0];
}
function randomInt(max = 100) {
  return Math.floor(Math.random() * max);
}

function BouncyBoi() {
  const charRef = useRef(randomChar());
  const leftRef = useRef(randomInt() + '%');
  const topRef = useRef(randomInt() + '%');
  const sizeRef = useRef(randomInt(10));
  const delayRef = useRef(randomInt(10));
  const repeatDelayRef = useRef(randomInt(10));

  return (
    <motion.div
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 270, 270, 0],
        borderRadius: ['20%', '20%', '50%', '50%', '20%'],
      }}
      transition={{
        duration: 2,
        ease: 'easeInOut',
        times: [0, 0.2, 0.5, 0.8, 1],
        loop: Infinity,
        repeatDelay: repeatDelayRef.current,
        delay: delayRef.current,
      }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: topRef.current,
        left: leftRef.current,
        fontSize: `calc((${sizeRef.current}vh + ${sizeRef.current}vw) / 2)`,
        height: `calc((${sizeRef.current}vh + ${sizeRef.current}vw) / 2)`,
        width: `calc((${sizeRef.current}vh + ${sizeRef.current}vw) / 2)`,
      }}
    >
      {charRef.current}
    </motion.div>
  );
}

export default BouncyBoi;
