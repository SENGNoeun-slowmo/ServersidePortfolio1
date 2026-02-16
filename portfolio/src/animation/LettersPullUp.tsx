// src/animation/LettersPullUp.tsx
'use client';

import { motion, useInView } from 'framer-motion';
import * as React from 'react';

export function LettersPullUp({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  const splittedText = text.split('');

  const pullupVariant = {
    initial: { y: 12, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.055,
      },
    }),
  };

  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="overflow-hidden">
      <div className="flex flex-wrap justify-center lg:justify-start">
        {splittedText.map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            variants={pullupVariant}
            initial="initial"
            animate={isInView ? 'animate' : 'initial'}
            custom={i}
            className={`inline-block text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight ${className}`}
          >
            {char === ' ' ? <>&nbsp;</> : char}
          </motion.span>
        ))}
      </div>
    </div>
  );
}