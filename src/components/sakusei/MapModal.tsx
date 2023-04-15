// components/MapModal.tsx

import { FC, useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface MapModalProps {
  show: boolean;
  onHide: () => void;
  onSelectLocation: (lat: number, lng: number) => void;
}

const containerStyle = {
  width: '394px',
  height: '600px',
  margin: '0 auto',
};

const defaultCenter = {
  lat: 35.6895,
  lng: 139.6917,
};

const MapModal: FC<MapModalProps> = ({ show, onHide, onSelectLocation }) => {
  const [selectedPosition, setSelectedPosition] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!show) {
      setSelectedPosition(null);
    }
  }, [show]);

  const handleClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setSelectedPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }
  };
  

  const handleConfirm = () => {
    if (selectedPosition) {
      onSelectLocation(selectedPosition.lat, selectedPosition.lng);
    }
    onHide();
  };

  return (
    <div style={{ display: show ? 'block' : 'none', position: 'relative' }}>
      <div>
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            zoom={10}
            onClick={handleClick}
          >
            {selectedPosition && <Marker position={selectedPosition} />}
          </GoogleMap>
        </LoadScript>
      </div>
      <button onClick={onHide} style={{ position: 'absolute', top: 0, right: 0 }}>
        閉じる
      </button>
      <button onClick={handleConfirm} style={{ position: 'absolute', bottom: 0, right: 0 }}>
        確定
      </button>
    </div>
  );
};

export default MapModal;
