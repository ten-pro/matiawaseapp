import Styles from "@/styles/Sakusei.module.css";

const form = () =>{
  
  return(
    <div>
      <form>
            <input type="text" placeholder="予定名" className={Styles.input}/>
            <input type="text" placeholder="集合場所" className={Styles.input}/>
            <input type="text" placeholder="集合時間" className={Styles.input}/>
            <select className={Styles.select}>
              <option hidden>予定アイコン一覧</option>
              <option value="" className={Styles.op}>食事</option>
              <option value="" className={Styles.op}>旅行</option>
              <option value="" className={Styles.op}>イベント</option>
            </select>
      </form>
    </div>
  )
}
export default form;