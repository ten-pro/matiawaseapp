// pages/index.tsx

import { useState } from 'react';
import MapModal from '@/components/sakusei/MapModal';
import styles from '@/styles/sakusei/MapSelect.module.css';

const IndexPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

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

export default IndexPage;
