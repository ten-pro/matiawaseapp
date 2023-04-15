import Styles from "@/styles/Frend.module.css";

const kakuteibtn=(props:any)=>{
  
  return(
    <div className={Styles.btn_area}>
      <button className={Styles.btn} onClick={props.handleSaveChanges}>追加</button>
    </div>
  )
}
export default kakuteibtn;