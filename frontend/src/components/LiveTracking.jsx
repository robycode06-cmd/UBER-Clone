import React, { useEffect, useRef, useState } from 'react';

const LiveTracking = () => {
  const mapRef = useRef(null);
  const [currentPosition, setCurrentPosition] = useState({ lat: 25.2579, lng: 87.0414 }); // Default fallback coordinates
  const [mapLoaded, setMapLoaded] = useState(false);

  // Load Leaflet CDN resources dynamically
  useEffect(() => {
    if (window.L) {
      setMapLoaded(true);
      return;
    }

    // Inject Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    // Inject Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    script.onload = () => {
      setMapLoaded(true);
    };
    document.head.appendChild(script);
  }, []);

  // Initialize Map and watch geolocation updates
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    const L = window.L;

    // Initialize map centering on current location with dragging explicitly enabled
    const map = L.map(mapRef.current, {
      dragging: true,
      touchZoom: true,
      zoomControl: true
    }).setView([currentPosition.lat, currentPosition.lng], 15);

    // Set up Geoapify Carto Tile Layer
    L.tileLayer('https://maps.geoapify.com/v1/tile/carto/{z}/{x}/{y}.png?apiKey=77681929e6a949dba2070326f1184f50', {
      attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors',
      maxZoom: 20,
    }).addTo(map);

    // Add a concentric marker (black circle with white dot in the center)
    const outerMarker = L.circleMarker([currentPosition.lat, currentPosition.lng], {
      radius: 10,
      color: '#000',       // Black border
      weight: 2,           // Border weight
      opacity: 1,
      fillColor: '#000',   // Black fill
      fillOpacity: 1
    }).addTo(map);

    const innerMarker = L.circleMarker([currentPosition.lat, currentPosition.lng], {
      radius: 4,
      color: '#fff',       // White border
      weight: 1,           // Border weight
      opacity: 1,
      fillColor: '#fff',   // White fill
      fillOpacity: 1
    }).addTo(map);

    // Get initial position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
          outerMarker.setLatLng([latitude, longitude]);
          innerMarker.setLatLng([latitude, longitude]);
          map.setView([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting initial location:", error);
        }
      );
    }

    // Watch current location updates
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });

        // Move markers and pan map smoothly to new coordinates
        outerMarker.setLatLng([latitude, longitude]);
        innerMarker.setLatLng([latitude, longitude]);
        map.setView([latitude, longitude]);
      },
      (error) => {
        console.error("Error getting location updates:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );

    // Clean up map and watch listener on unmount
    return () => {
      navigator.geolocation.clearWatch(watchId);
      map.remove();
    };
  }, [mapLoaded]);

  return (
    <div 
      ref={mapRef} 
      style={{ width: '100%', height: '100%', zIndex: 1 }}
      className='w-full h-full'
    />
  );
};

export default LiveTracking;