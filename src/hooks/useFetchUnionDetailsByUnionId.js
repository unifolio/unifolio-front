import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import API from "lib/api";

const useFetchUnionDetailsByUnionId = () => {
  const { id: unionId } = useParams();
  const [unionDetails, setUnionDetails] = useState();
  
  useEffect(() => {
    const fetchUnionData = async () => {      
      if (!unionId) return;
      const { data: unionDetails } = await API.get.unionDetail(unionId); // 유니언의 상세 정보
      setUnionDetails(unionDetails);
    };
    fetchUnionData();  
  }, []);
  
  return { unionDetails }
}

export default useFetchUnionDetailsByUnionId