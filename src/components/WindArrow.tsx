import React from 'react';

import type { WindArrowProps } from '@/utils/model';

const WindArrow: React.FC<WindArrowProps> = ({
  degree,
  speed,
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const getWindColor = (speed: number) => {
    if (speed < 3) return 'text-blue-300';
    if (speed < 7) return 'text-blue-500';
    if (speed < 12) return 'text-blue-700';
    return 'text-red-500';
  };

  return (
    <div className={`inline-flex items-center ${className}`}>
      <svg
        className={`${sizeMap[size]} ${getWindColor(speed)}`}
        style={{ transform: `rotate(${degree}deg)` }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </div>
  );
};

export default WindArrow;
