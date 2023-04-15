import Styles from "@/styles/Sakusei.module.css";
import axios from 'axios'

type Props = {
  name: string
  date: string
  time: string
  icon: string
}

function sakuseibtn(props: Props) {
  const schedule_create = async () => {
    try {
      const response = await axios.post(
        'http://mp-class.chips.jp/matiawase/main.php',
        {
          create_schedule:'',
          schedule_name:props.name,
          schedule_lat:'',
          // 139.767214
          schedule_lng:'',
          // 35.681042
          schedule_time:'',
          icon_id: '2',
          user_ids:[1,2]
        },
        {headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      );
      console.log(response)
    } catch(error) {
      console.log(error)
    }
  };
  return(
    <div className={Styles.btn_area}>
      <button className={Styles.btn} onClick={ schedule_create }>作成</button>
    </div>
  )
}
export default sakuseibtn;