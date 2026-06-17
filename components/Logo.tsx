
import React from 'react';

const Logo = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24 6C14.058 6 6 14.058 6 24C6 33.942 14.058 42 24 42C33.942 42 42 33.942 42 24C42 14.058 33.942 6 24 6Z"
      fill="#4CAF50"
    />
    <path
      d="M24 12C16.269 12 10 18.269 10 26C10 33.731 16.269 40 24 40C31.731 40 38 33.731 38 26C38 18.269 31.731 12 24 12Z"
      fill="url(#paint0_linear_101_2)"
    />
    <path
      d="M31 22L24 29L17 22"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_101_2"
        x1="24"
        y1="12"
        x2="24"
        y2="40"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#66BB6A" />
        <stop offset="1" stopColor="#388E3C" />
      </linearGradient>
    </defs>
  </svg>
);

export default Logo;
