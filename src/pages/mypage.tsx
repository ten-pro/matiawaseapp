import Styles from "@/styles/Mypage.module.css";
import Header from "@/components/Header";
import Modoru from "@/components/modoru";
import Top from "@/components/Top";
import Btn from "@/components/mypage/btn";
import Mypagehyouzi from "@/components/mypage/mypagehyouzi";
import Mypageinput from "@/components/mypage/mypageinput";
import Hozonbtn from "@/components/mypage/hozonbtn";
import axios from "axios";
import { useState,useEffect } from "react";

interface User {
  user_name: string;
  user_mail: string;
}

  const Mypage: React.FC = () => {
  const[henkoubtn,setHenkoubtn] = useState<boolean>(true);
  const[hozonbtn,sethozonbtn]  = useState<boolean>(false);
  const[input,setinput] = useState<boolean>(false);
  const[hyouzi,sethyouzi] = useState<boolean>(true);

  
  const hidediv = () =>{
    setHenkoubtn(false);
    sethozonbtn(true);
    setinput(true);
    sethyouzi(false);
  }
  
    const [user, setUser] = useState<User>({
      user_name: '',
      user_mail: '',
    });

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.post(
        'https://mp-class.chips.jp/matiawase/main.php',
        {
          update_user:'',
          user_id:10,
          newname:user.user_name,
          newmail:user.user_mail
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setHenkoubtn(true);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://mp-class.chips.jp/matiawase/main.php',
          {
            login_user: '',
            name: 'テストユーザ４',
            pass: 'pass0000',
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        if (response.data === false) {
          // userData.error1 = true;
        } else {
          sessionStorage.setItem('id', response.data.user_information.user_id);
          let user_name: string = response.data.user_information.user_name;
          let user_mail: string = response.data.user_information.user_mail;
          setUser({ user_name: user_name, user_mail: user_mail });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  
  return(
    <div>
      <Header/>
      <Modoru/>
      <div className={Styles.mypage_area}>
        <div className={Styles.input} style={{display:henkoubtn?'block':'none'}}>
          <Mypagehyouzi user_name={user.user_name} user_mail={user.user_mail}/>
        </div>
        <div className={Styles.input_area} style={{display:henkoubtn?'none':'block'}}>
          <Mypageinput user_name={user.user_name} user_mail={user.user_mail} onUserUpdate={handleUserUpdate}/>
        </div>
        <div style={{display:henkoubtn?'block':'none'}}>
          <Btn hidediv={hidediv}/>
          
        </div>
        <div style={{display:henkoubtn?'none':'block'}}>
          <Hozonbtn handleSaveChanges={handleSaveChanges}/>
        </div>
        
      </div>
      <Top/>
    </div>
    
  )
}
export default Mypage;