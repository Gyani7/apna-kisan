'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

declare global {
  interface Window {
    mapplsgl: any;
  }
}

export function भारतGIS() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [mapStyle, setMapStyle] = useState('standard');

  useEffect(() => {
    if (mapRef.current && window.mapplsgl) {
      const mapplsMap = new window.mapplsgl.Map(mapRef.current, {
        center: [28.6139, 77.2090],
        zoom: 4,
        accessToken: 'YOUR_MAPPLS_API_KEY',
      });

      mapplsMap.on('load', () => {
        mapplsMap.addControl(new window.mapplsgl.NavigationControl(), 'top-right');
        mapplsMap.addControl(new window.mapplsgl.FullscreenControl(), 'top-right');
        setMap(mapplsMap);
      });

      return () => mapplsMap.remove();
    }
  }, []);

  const handleStyleChange = (style: string) => {
    if (map) {
      map.setStyle(style);
      setMapStyle(style);
    }
  };

  return (
    <Card className="bg-transparent border-none text-white h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Mappls GIS View</CardTitle>
        <div className="flex space-x-2">
          <Button onClick={() => handleStyleChange('standard')} variant={mapStyle === 'standard' ? 'secondary' : 'default'}>Standard</Button>
          <Button onClick={() => handleStyleChange('satellite')} variant={mapStyle === 'satellite' ? 'secondary' : 'default'}>Satellite</Button>
          <Button onClick={() => handleStyleChange('terrain')} variant={mapStyle === 'terrain' ? 'secondary' : 'default'}>Terrain</Button>
        </div>
      </CardHeader>
      <CardContent className="h-full">
        <div ref={mapRef} id="map" className="h-full w-full rounded-lg"></div>
      </CardContent>
    </Card>
  );
}
