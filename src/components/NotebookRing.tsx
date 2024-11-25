// src/components/NotebookRing.tsx

import React from 'react';

interface NotebookRingProps {
  position: number; // Position from the top in pixels
}

const NotebookRing: React.FC<NotebookRingProps> = ({ position }) => {
  return (
    <div
      className="absolute left-0 w-4 h-4 bg-blue-500 rounded-full border border-gray-300"
      style={{ top: position }}
    ></div>
  );
};

export default NotebookRing;
