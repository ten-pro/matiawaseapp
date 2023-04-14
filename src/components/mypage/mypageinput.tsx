import Styles from "@/styles/Mypage.module.css";
import { useState } from "react";
// const mypageinput = (props:any) =>{

//   return(
//     <div >
//       <input type="text" placeholder="名前" className={Styles.input1}/>
//       <input type="text" placeholder="メールアドレス" className={Styles.input1}/>


//     </div>
//   )
// }
// export default mypageinput;

// interface User {
//   user_name: string;
//   user_mail: string;
// }

// const Mypageinput: React.FC<User> = ({ user_name, user_mail }) => {
//   return (
    
//     <div >
//            <input type="text" placeholder={user_name} className={Styles.input1}/>
//            <input type="text" placeholder={user_mail} className={Styles.input1}/>
//     </div>
//   );
// };

// export default Mypageinput;



// interface User {
//   user_name: string;
//   user_mail: string;
// }

// interface Props {
//   user_name: string;
//   user_mail: string;
//   onUserUpdate: (updatedUser: User) => void;
// }

// const Mypageinput: React.FC<User> = ({ user_name, user_mail }) => {
//   const [inputValues, setInputValues] = useState({
//     user_name: user_name,
//     user_mail: user_mail,
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValues({
//       ...inputValues,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         name="user_name"
//         value={inputValues.user_name}
//         placeholder={inputValues.user_name}
//         onChange={handleInputChange}
//         className={Styles.input1}
//       />
//       <input
//         type="text"
//         name="user_mail"
//         value={inputValues.user_mail}
//         placeholder={inputValues.user_mail}
//         onChange={handleInputChange}
//         className={Styles.input1}
//       />
//     </div>
//   );
// };

// export default Mypageinput;


interface User {
  user_name: string;
  user_mail: string;
}

interface Props {
  user_name: string;
  user_mail: string;
  onUserUpdate: (updatedUser: User) => void;
}

const Mypageinput: React.FC<Props> = ({ user_name, user_mail, onUserUpdate }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    onUserUpdate({ ...{ user_name, user_mail }, [name]: value });
  };

  return (
    <div>
      <input type="text" name="user_name" value={user_name} onChange={handleInputChange} placeholder={user_name} className={Styles.input1}/>
      <input type="text" name="user_mail" value={user_mail} onChange={handleInputChange} placeholder={user_mail} className={Styles.input1}/>
    </div>
  );
};
export default Mypageinput;