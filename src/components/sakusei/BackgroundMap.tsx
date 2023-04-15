import React, { useEffect, useRef } from "react";

interface GoogleMapProps {
  width?: string;
  height?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ width = "100%", height = "100%" }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;
      script.defer = true;
      script.async = true;

      window.initMap = () => {
        const map = new google.maps.Map(mapRef.current as HTMLElement, {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
        });

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };

              map.setCenter(pos);
            },
            () => {
              console.error("Error: The Geolocation service failed.");
            }
          );
        } else {
          console.error("Error: Your browser doesn't support geolocation.");
        }
      };

      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
        delete window.initMap;
      };
    }
  }, []);

  return <div ref={mapRef} style={{ width, height }} />;
};

export default GoogleMap;
