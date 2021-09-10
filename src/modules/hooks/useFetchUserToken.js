import { useEffect, useState} from "react";
import API from 'lib/api';

const useFetchUserToken = () => {

  const [user, setUser] = useState(null);

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
        window.location.href = '/signin';
      }
      
      const response = await API.post.tokenToGetUser(tokenData);
      console.log("res", response);
      
      if (response.status === 200 || response.status === 201) {
        console.log("user id", response.data.id);
        const userId = response.data.id;
        const fetchedUser = await API.get.userGeneral({ userId });
        setUser(fetchedUser.data);
      } 
      else {
        alert('로그인이 만료되었습니다. 다시 로그인 해주세요.');
        // localStorage.removeItem('unifolioAccess');
        // localStorage.removeItem('unifolioUser');
        window.location.href = '/signin';
      }
    };
    if (user === null) {
      fetchData();
    }
  }, [user]);

  return { user };
}
export default useFetchUserToken;