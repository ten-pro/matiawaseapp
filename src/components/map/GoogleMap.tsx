import React, { useEffect, useRef, useState } from "react";

interface GoogleMapProps {
  apiKey: string;
  otherLocation: {
    lat: number;
    lng: number;
  };
  destination: {
    lat: number;
    lng: number;
  };
  setMyLocation: (value: google.maps.LatLngLiteral) => void;
}

const addMarkers = (
  map: google.maps.Map,
  currentPosition: google.maps.LatLngLiteral,
  otherPosition: google.maps.LatLngLiteral,
  destination: google.maps.LatLngLiteral
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
  // 目的地のマーカー
  new google.maps.Marker({
    position: destination,
    map,
    title: "Destination",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
    },
  });
};

const GoogleMap: React.FC<GoogleMapProps> = ({ apiKey, otherLocation, destination, setMyLocation }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const watchId = useRef<number | null>(null);

  const initMap = (
    currentPosition?: google.maps.LatLngLiteral,
    otherPosition?: google.maps.LatLngLiteral,
    destination?: google.maps.LatLngLiteral
  ) => {
    if (mapRef.current && typeof google !== "undefined") {
      const map = new google.maps.Map(mapRef.current, {
        center: currentPosition || otherLocation,
        zoom: 8,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false
      });

      if (currentPosition && otherPosition && destination) {
        addMarkers(map, currentPosition, otherPosition, destination);
      }
    }
  };

  useEffect(() => {
    if (document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js?key="]')) {
      window.initMap = initMap;
      return;
    }

    window.initMap = initMap;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.defer = true;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      delete window.initMap;
    };
  }, [apiKey]);

  useEffect(() => {
    console.log("otherLocation", otherLocation);
    if (navigator.geolocation) {
      // watchPosition を使って位置情報を監視し、ID を保存します
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // ここで myLocation を更新します
          setMyLocation(currentPosition);

          initMap(currentPosition, otherLocation, destination);
        },
        (error) => {
          console.error("Error occurred while getting current location.", error);
        }
      );

      watchId.current = id;
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    };
  }, [otherLocation, destination, setMyLocation]);
  

return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
};

export default GoogleMap;
