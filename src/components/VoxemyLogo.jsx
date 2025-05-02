import React from 'react';

const VoxemyLogo = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-800 
to-purple-500">
        Voxemy
      </span>
    </div>
  );
};

export default VoxemyLogo;
