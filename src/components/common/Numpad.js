import React, {useState, useRef} from 'react';
import styled from 'styled-components';

const Numpad = ({ ActiveComponent, min = 0, monetaryUnit = 0 }) => {
  const $Input = useRef(null);
  const [value, setValue] = useState('');
  const [isActive, setIsActive] = useState(false)

  const toggleNumpad = () => {

    if (!isActive) setIsActive(true);
    else if (convertToNumber(value) !== 0 && convertToNumber(value) < min ) {
      alert(`최소 금액은 ${convertToMoney(min)}원 이상입니다. 최소 금액 이상으로 다시 입력해주세요`);
      setValue('0');
      setIsActive(false);
    } else {
      ActiveComponent.props.onChange($Input.current)
      setIsActive(false);
    }
  }
  
  const convertToMonetaryUnit = (nums) => {
    if (nums.includes(",")) 
      return `${Number(nums.replace(/,/g, ""))/monetaryUnit}`
    return nums;
  }
  
  const convertToNumber = (nums) => { return Number(nums.replace(/,/g, "")) }
  const convertToMoney = (nums) => { return `${Number(nums)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}

  const validate = (num) => {
    if (Number(num) === 0) return '0';
    
    const arrayMonetaryUnit = String(monetaryUnit).match(/.{1,3}(?=(.{3})*$)/g);
    const formatMonetaryUnit = arrayMonetaryUnit.join(",").slice(1);
    const last = 3-(arrayMonetaryUnit[0].length-1);
    if (num.length > last) {
      return `${`${Number(num.slice(0, -last))}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")},${num.slice(-last)}${formatMonetaryUnit}`
    } else {
      return `${`${Number(num)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${formatMonetaryUnit}`;
    }
  }
  
  const onButtonClick = (buttonValue) => {
    const digitValue = convertToMonetaryUnit(value)

    // const valueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    // valueSetter.call($Input.current, validate(digitValue.slice(0, -1)));
    // const inputEvent = new Event('input', { bubbles: true});
    // $Input.current.dispatchEvent(inputEvent);
    
    switch(buttonValue) {
      case "C":
        setValue(validate(digitValue.slice(0, -1)));
        break;
      case "AC":
        setValue('0');
        break;
      default:
        setValue(validate(`${Number(`${digitValue}${buttonValue}`)}`))
        break;
    }
        
  }
	return (
    <>
    <NumInput {...ActiveComponent.props} 
      ref={$Input} value={value} onClick={toggleNumpad} autoComplete={"off"} readOnly={true}
    />
		<NumpadLayout isActive={isActive} >
      <NumpadRow>
        <NumpadButton onClick={() => {onButtonClick(7)}} > 7 </NumpadButton>
        <NumpadButton onClick={() => {onButtonClick(8)}} > 8 </NumpadButton>
        <NumpadButton onClick={() => {onButtonClick(9)}} > 9 </NumpadButton>
      </NumpadRow>
      <NumpadRow>
        <NumpadButton onClick={() => {onButtonClick(4)}} > 4 </NumpadButton>
        <NumpadButton onClick={() => {onButtonClick(5)}} > 5 </NumpadButton>
        <NumpadButton onClick={() => {onButtonClick(6)}} > 6 </NumpadButton>
      </NumpadRow>
      <NumpadRow>
        <NumpadButton onClick={() => {onButtonClick(1)}} > 1 </NumpadButton>
        <NumpadButton onClick={() => {onButtonClick(2)}} > 2 </NumpadButton>
        <NumpadButton onClick={() => {onButtonClick(3)}} > 3 </NumpadButton>
      </NumpadRow>
      <NumpadRow>
        <NumpadButton onClick={() => {onButtonClick("AC")}}> AC </NumpadButton>
        <NumpadButton onClick={() => {onButtonClick(0)}} > 0 </NumpadButton>
        <NumpadButton onClick={() => {onButtonClick("C")}}> C </NumpadButton>
      </NumpadRow>
    </NumpadLayout>
    <NumpadBackground isActive={isActive} onClick={toggleNumpad} />
    </>
	);
};

const NumpadBackground = styled.div`
  position:fixed;
  z-index: 1;
  width:100vw;
  height:100vh;
  top: 0;
  left: 0;
  display: ${(props) => { return props.isActive ? "block" : "none" } };
`

const NumpadLayout = styled.div`
  position: absolute;
  z-index: 2;
  margin-top: 50px;
  background-color:white;
  display: ${(props) => { return props.isActive ? "block" : "none" } };
`

const NumpadRow = styled.div`
  width:210px;
  display: flex;
`
const NumpadButton = styled.div`
  height: 50px;
  border: 1px solid gray;
  margin-top: 1px;
  margin-left: 1px;
  margin-right: -2px;
  margin-bottom: -2px;
  border-collapse: collapse;
  cursor: pointer;
  :hover {
    background-color: gray
  }

  display: flex;
  flex-basis: 70px;
  justify-content: center;
`

const NumInput = styled.input`
  margin: 0;
  padding: 0;
  border: 1px solid #d9d9d9;
  color: rgba(0, 0, 0, 0.85);
  border-radius: 2px;
  box-sizing: border-box;
  padding: 6.5px 11px;
  font-size: 16px;
  cursor: pointer;
`
export default Numpad;
