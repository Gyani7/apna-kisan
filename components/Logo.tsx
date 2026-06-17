import React from 'react';

const Logo = ({ className, ...props }: React.SVGProps<SVGSVGElement> & { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    className={className}
    {...props}
  >
    <rect width="256" height="256" fill="none" />
    <path
      d="M48.3,128A80,80,0,0,1,184,88.2V208a8,8,0,0,1-16,0V105.7a80.1,80.1,0,0,1-128,21.5,8,8,0,1,1,8.6-13.8A64.1,64.1,0,0,0,112,201.5V48a8,8,0,0,1,16,0V88.2A80,80,0,0,1,48.3,128Z"
      fill="currentColor"
    />
  </svg>
);

export default Logo;
