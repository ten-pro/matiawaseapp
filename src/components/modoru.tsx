import styles from "@/styles/Mypage.module.css";
const modoru = () =>{

  const modoruclick = () =>{
    window.history.back();
  }

  return(
    <div onClick={modoruclick}>
      <div className={styles.circle}>
        <p className={styles.p}>←</p>
      </div>
    </div>
  );
};
export default modoru;