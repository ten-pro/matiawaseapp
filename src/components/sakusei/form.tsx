import Styles from "@/styles/Sakusei.module.css";

const form = (props:any) =>{

  const inputarea = (e:any)=>{
    props.setyotei(e.target.value);
    props.setplace(e.target.value);
    props.settime(e.target.value);
    props.seticon(e.target.value);
  }
  
  return(
    <div>
      <form>
            <input type="text" placeholder="予定名" className={Styles.input} onChange={inputarea}/>
            <input type="text" placeholder="集合場所" className={Styles.input} onChange={inputarea}/>
            <input type="text" placeholder="集合時間" className={Styles.input} onChange={inputarea}/>
            <select className={Styles.select} onChange={inputarea}>
              <option hidden>予定アイコン一覧</option>
              <option value="食事" className={Styles.op}>食事</option>
              <option value="旅行" className={Styles.op}>旅行</option>
              <option value="イベント" className={Styles.op}>イベント</option>
            </select>
      </form>
    </div>
  )
}
export default form;