import { useEffect, useState } from "react";
import styles from "@/styles/map/map.module.css";
import Header from "@/components/Header";

const map =()=> {
  const [scale, setScale] = useState(1);

  return (
    <div className={styles.container}>
        <Header />
    </div>
  );
}

export default map;
