// components/MapModal.tsx

import { FC, useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import styles from '@/styles/sakusei/MapModal.module.css';

interface MapModalProps {
  show: boolean;
  onHide: () => void;
  onSelectLocation: (lat: number, lng: number) => void;
}

const containerStyle = {
  width: '394px',
  height: '650px',
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
    <div style={{ display: show ? 'block' : 'none', position: 'absolute' }} className={styles.wrap}>
      <div>
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            zoom={10}
            onClick={handleClick}
            options={{
                zoomControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
                streetViewControl: false,
            }}
          >
            {selectedPosition && <Marker position={selectedPosition} />}
          </GoogleMap>
        </LoadScript>
      </div>
      <div onClick={onHide} className={styles.closeButton}>
        閉じる
      </div>
      <div onClick={handleConfirm} className={styles.sendButton}>
        確定
      </div>
    </div>
  );
};

export default MapModal;
