
import React from 'react';

export const PspWaves: React.FC = () => {
  return (
    <>
      {/* Background Gradient Base - Specific to PSP Blue Theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00aaff] via-[#0066cc] to-[#003366] z-0"></div>

      {/* SVG Definition for the clip path */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="wave" clipPathUnits="objectBoundingBox">
            <path d="M0,0.5 C0.25,0.75 0.75,0.25 1,0.5 L1,1 L0,1 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Wave Container */}
      <div className="wave-container z-0 opacity-50">
        {/* We use inline styles for the clip-path to ensure it references the SVG ID correctly */}
        <div className="wave wave1" style={{ clipPath: 'url(#wave)' }}></div>
        <div className="wave wave2" style={{ clipPath: 'url(#wave)' }}></div>
        <div className="wave wave3" style={{ clipPath: 'url(#wave)' }}></div>
      </div>
    </>
  );
};
