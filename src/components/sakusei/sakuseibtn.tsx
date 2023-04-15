
// Btn.tsx
import React from 'react';
import Styles from '@/styles/Sakusei.module.css';

type BtnProps = {
  onClick: () => void;
};

const Btn: React.FC<BtnProps> = ({ onClick }) => {
  return (
    <button className={Styles.btn} onClick={onClick}>
      作成
    </button>
  );
};

export default Btn;

