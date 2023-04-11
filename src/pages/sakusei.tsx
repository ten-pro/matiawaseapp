import Styles from "@/styles/Sakusei.module.css";
import Header from "@/components/Header";
import Modoru from "@/components/modoru";
import Btn from "@/components/sakusei/sakuseibtn";
import Form from "@/components/sakusei/form";
import Top from "@/components/Top";

function sakusei(){
  return(
    <div>
      <Header/>
      <Modoru/>
        <div className={Styles.saku_area}>
          <div className={Styles.input_area}>
            
            <Form/>
          </div>
          <Btn/>
        </div>
        
      <Top/>
    </div>
    
  )
}
export default sakusei;