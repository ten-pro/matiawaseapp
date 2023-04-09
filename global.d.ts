// global.d.ts

interface Window {
    initMap?: (
      currentPosition: google.maps.LatLngLiteral,
      otherPosition: google.maps.LatLngLiteral
    ) => void;
  }
  