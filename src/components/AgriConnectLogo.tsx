import React from 'react';

const AgriConnectLogo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <img src="/logo.png" alt="AgriConnect Logo" className="h-8 w-8" />
      <span className="font-bold text-lg">AgriConnect</span>
    </div>
  );
};

export default AgriConnectLogo;
