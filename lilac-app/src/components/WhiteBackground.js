import React from 'react';

const WhiteBackground = () => (
  
    <svg
    position='absolute'
    z-index='-1'
    width="390"
      height="700"
      viewBox="0 0 702 709"
     
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_bd)">
        <rect x="4.58215" y="0.589722" width="693.418" height="766.41" rx="51" fill="white" />
      </g>
      <defs>
        <filter
          id="filter0_bd"
          x="0.582153"
          y="-3.41028"
          width="701.418"
          height="778.41"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImage" stdDeviation="2" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="effect1_backgroundBlur" result="effect2_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>

);
export default WhiteBackground;
