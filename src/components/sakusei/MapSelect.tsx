// pages/index.tsx
import { FC } from 'react';
import { useState } from 'react';
import MapModal from '@/components/sakusei/MapModal';
import styles from '@/styles/sakusei/MapSelect.module.css';

interface MapSelectProps {
  latitude: number | null;
  longitude: number | null;
  setLatitude: (lat: number | null) => void;
  setLongitude: (lng: number | null) => void;
}

// 上記のPropsを使用して関数を定義します。
const MapSelect: FC<MapSelectProps> = ({ latitude, longitude, setLatitude, setLongitude }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSelectLocation = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  return (
    <div>
      <div onClick={handleOpenModal} className={styles.openButton}>地図を開く</div>
      <MapModal
        show={showModal}
        onHide={handleCloseModal}
        onSelectLocation={handleSelectLocation}
      />
      {latitude && longitude && (
        <div className={styles.latlng}>
          <p>緯度: {latitude}</p>
          <p>経度: {longitude}</p>
        </div>
      )}
    </div>
  );
};

export default MapSelect;
