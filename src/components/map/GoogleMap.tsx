import React, { useEffect, useRef } from "react";

interface GoogleMapProps {
  apiKey: string;
  otherLocation: {
    lat: number;
    lng: number;
  };
}

const addMarkers = (
  map: google.maps.Map,
  currentPosition: google.maps.LatLngLiteral,
  otherPosition: google.maps.LatLngLiteral
) => {
  // 自分の現在地のマーカー
  new google.maps.Marker({
    position: currentPosition,
    map,
    title: "My location",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    },
  });

  // 相手の現在地のマーカー
  new google.maps.Marker({
    position: otherPosition,
    map,
    title: "Other location",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
    },
  });
};

//otherLocationは相手の緯度経度
const GoogleMap: React.FC<GoogleMapProps> = ({ apiKey, otherLocation }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initMap = (
      currentPosition?: google.maps.LatLngLiteral,
      otherPosition?: google.maps.LatLngLiteral
    ) => {
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: currentPosition || otherLocation,
          zoom: 8,
        });

        if (currentPosition && otherPosition) {
          addMarkers(map, currentPosition, otherPosition);
        }
      }
    };

    window.initMap = initMap;
    initMap();

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.defer = true;
    script.async = true;
    document.head.appendChild(script);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // 仮に相手の位置を現在地から少し離れた位置にする
          otherLocation.lat = currentPosition.lat + 0.1;
          otherLocation.lng = currentPosition.lng + 0.1;

          initMap(currentPosition, otherLocation);
        },
        (error) => {
          console.error("Error occurred while getting current location.", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    return () => {
      document.head.removeChild(script);
      delete window.initMap;
    };
  }, [apiKey, otherLocation]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
};

export default GoogleMap;
