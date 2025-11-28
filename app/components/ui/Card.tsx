'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  with3D?: boolean;
  withHover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  with3D = false,
  withHover = false,
}) => {
  const baseStyles = 'bg-white rounded-xl shadow-md';
  
  const cardClasses = `${baseStyles} ${className}`;

  if (with3D || withHover) {
    return (
      <motion.div
        className={cardClasses}
        whileHover={with3D ? {
          scale: 1.03,
          rotateY: 2,
          rotateX: 2,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
          transition: { type: "spring", stiffness: 300, damping: 20 }
        } : {
          y: -8,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
          transition: { duration: 0.3 }
        }}
        style={with3D ? {
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        } : {}}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={cardClasses}>{children}</div>;
};

