import { motion } from "framer-motion";
import React, { useRef } from "react";

const chars = ["★", "✦", "✢", "✿", "❀", "❁", "✾", "❄"];

function randomChar() {
  const index = Math.floor(Math.random() * chars.length);
  return chars[index] ?? chars[0];
}
function randomInt(max = 100) {
  return Math.floor(Math.random() * max);
}

function BouncyBoi() {
  const charRef = useRef(randomChar());
  const leftRef = useRef(randomInt() + "%");
  const topRef = useRef(randomInt() + "%");
  const sizeRef = useRef(randomInt(10));
  const delayRef = useRef(randomInt(10));
  const repeatDelayRef = useRef(randomInt(10) + 4);

  return (
    <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "fixed",
      top: topRef.current,
      left: leftRef.current,
      fontSize: `calc((${sizeRef.current}vh + ${sizeRef.current}vw) / 2)`,
      height: `calc((${sizeRef.current}vh + ${sizeRef.current}vw) / 2)`,
      width: `calc((${sizeRef.current}vh + ${sizeRef.current}vw) / 2)`,
      color: "white",
      opacity: ".2",
    }}
  >
    <motion.div
      animate={{ top: '20%'}}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "mirror",
        delay: delayRef.current,
      }}
      style={{
        position: 'absolute'
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          delay: delayRef.current,
          repeat: Infinity,
          repeatDelay: repeatDelayRef.current,
          repeatType: "reverse",
        }}
      >
 
          {charRef.current}
      </motion.div>
    </motion.div>
    </div>

  );
}

export default BouncyBoi;
