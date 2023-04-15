// pages/index.tsx

import { useState } from 'react';
import MapModal from '@/components/sakusei/MapModal';

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
      <button onClick={handleOpenModal}>地図を開く</button>
      <MapModal
        show={showModal}
        onHide={handleCloseModal}
        onSelectLocation={handleSelectLocation}
      />
      {latitude && longitude && (
        <div>
          <p>選択された緯度: {latitude}</p>
          <p>選択された経度: {longitude}</p>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
