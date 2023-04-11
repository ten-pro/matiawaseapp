import styles from "@/styles/Top.module.css";
import Image from 'next/image';
import Link from "next/link";
const top = () =>{
  return(
    <div className={styles.top}>
      <Link href="/frend">
      <div className={styles.circle2}>
        <Image className={styles.map} src="/images/map.png" alt="logo" width={50} height={50}/>
      </div>
      </Link>
    </div>
  );
};
export default top;