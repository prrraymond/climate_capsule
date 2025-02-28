'use client';

import React, { useEffect, useState } from 'react';

export default function ClientDebug({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // This will execute after hydration
    setIsHydrated(true);
    console.log('Client hydration complete');
  }, []);

  return (
    <>
      {children}
      {!isHydrated && (
        <div style={{ 
          position: 'fixed', 
          bottom: 10, 
          right: 10, 
          background: 'rgba(255,0,0,0.2)', 
          padding: '4px 8px', 
          borderRadius: '4px',
          color: 'white',
          fontSize: '12px'
        }}>
          Hydrating...
        </div>
      )}
    </>
  );
}