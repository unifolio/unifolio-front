import { useEffect } from "react";

const useDaumPostcode = (callbackCompleteSearchPostcodeProcess) => {
  useEffect(() => {  
    const script = document.createElement('script');
    script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    document.body.appendChild(script);
  }, []);

  const handleClickToChangeAddress = () => {
    new window.daum.Postcode({
      oncomplete: callbackCompleteSearchPostcodeProcess
    }).open();
  }

  return { handleClickToChangeAddress };
};

export default useDaumPostcode;
