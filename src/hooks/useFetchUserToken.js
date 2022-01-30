import { useEffect, useState} from "react";
import { useHistory } from "react-router-dom";

import API from 'lib/api';

const useFetchUserToken = () => {

  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const tokenData = { 
        accessToken: localStorage.getItem('unifolioAccess'), 
        user: localStorage.getItem('unifolioUser') 
      };
      console.log("tokenData:", tokenData);
      if (tokenData.accessToken === null) {
        // alert('로그인 기록이 없습니다 1');
        // localStorage.removeItem('unifolioUser');
        history.push('/signin');
      }
      
      const response = await API.post.tokenToGetUser(tokenData);
      console.log("response", response) // 0116 정상

      if (response.status === 200 || response.status === 201) {
        if (response.data.role === "business") {
          console.log("user id", response.data.id);
          const userId = response.data.id;
          const fetchedUser = await API.get.userBusiness({ userId });
          setUser({...fetchedUser.data, ...response.data});
        }
        else if (response.data.role === "general") {
          console.log("user id", response.data.id);
          const userId = response.data.id;
          const fetchedUser = await API.get.userGeneral({ userId });
          setUser({...fetchedUser.data, ...response.data});
        }
      } 
      else {
        alert('로그인이 만료되었습니다. 다시 로그인 해주세요.');
        localStorage.removeItem('unifolioAccess');
        localStorage.removeItem('unifolioUser');
        // history.push('/signin');
      }
    };
    if (user === null) {
      fetchData();
    }
  }, [user]);

  return { user };
}
export default useFetchUserToken;