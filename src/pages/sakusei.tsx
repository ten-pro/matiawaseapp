import Styles from "@/styles/Sakusei.module.css";
import Header from "@/components/Header";
import Modoru from "@/components/mypage/modoru";
import Btn from "@/components/sakusei/sakusei";
import Top from "@/components/Top";

function sakusei(){
  return(
    <div>
      <Header/>
      <Modoru/>
        <div className={Styles.saku_area}>
          <div className={Styles.input_area}>
            <input type="text" placeholder="予定名" className={Styles.input}/>
            <input type="text" placeholder="集合場所" className={Styles.input}/>
            <input type="text" placeholder="集合時間" className={Styles.input}/>
            <select className={Styles.select}>
              <option hidden>予定アイコン一覧</option>
              <option value="" className={Styles.op}>食事</option>
              <option value="" className={Styles.op}>旅行</option>
              <option value="" className={Styles.op}>イベント</option>
            </select>
          </div>
          <Btn/>
        </div>
        
      <Top/>
    </div>
    
  )
}
export default sakusei;