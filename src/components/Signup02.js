import React, {useState, useEffect, useCallback} from 'react';

const Signup02 = (props) => {
  const { onClickNext } = props;
  const [name, SetName] = useState("");
  const [rrn, SetRRN] = useState("");
  const [postcode, SetPostCode] = useState("");
  const [address, SetAddress] = useState("");
  const [addressDetail, SetAddressDetail] = useState("");
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = () => { console.log("is onload ?"); }
    document.body.appendChild(script);
  }, []);
  
  const clickPostAdress = (open = false) => {
    console.log("open", open);
    if (open === false ) {
      if (document.querySelector("input#postcode").value !== "") {
        return;
      }
    }
    
    new window.daum.Postcode({
      oncomplete: function(data) {
        console.log(data);
        let postcode = data.zonecode;
        let address = data.address;
        document.querySelector("input#postcode").value = postcode;
        document.querySelector("input#address").value = address;
        SetPostCode(postcode);
        SetAddress(address);
      }
    }).open();
  }
  
  const handleChangeName = useCallback((e) => {
    SetName(e.target.value);
  });

  const handleChangeRRN = useCallback((e) => {
    SetRRN(e.target.value);
  });

  const handleChangeAddressDetail = useCallback((e) => {
    SetAddressDetail(e.target.value);
  });

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onClickNext({name, rrn, postcode, address, addressDetail}, 2);
  });

  

  return (
    <>
    <h1> 회원가입 </h1>
    <form onSubmit={handleSubmit}>
      이름 : <input type="text" name="name" onChange={handleChangeName}/> <br />
      주민등록번호 : <input type="text" name="rrn" onChange={handleChangeRRN} /> <br />
      <button onClick={(e) => {clickPostAdress(true)}}> 우편번호 찾기 </button> <br />
      <input type="text" id="postcode" name="postcode" placeholder="우편번호" readOnly={true} onClick={() => {clickPostAdress()}}  required=""/> <br />
      <input type="text" id="address" name="address" placeholder="주소" readOnly={true}  onClick={() => {clickPostAdress()}} required="" /><br />
      <input type="text" id="detail_address"name="detail_address" placeholder="상세주소" required="" onChange={handleChangeAddressDetail}/><br />
      <button type="submit"> 다음으로 </button>
    </form>
      
    </>
  );
}

export default Signup02;
