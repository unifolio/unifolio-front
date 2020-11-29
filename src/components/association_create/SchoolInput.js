import React, {useState, useCallback} from 'react';
import { Input, Button } from 'antd';

const SchoolInput = (props) => {
  
  const { type, count, onSchoolChange } = props;

  const handleSchoolChange = useCallback((e) => {
    let value = e.target.value;
    onSchoolChange({value, count});
  });
  
  const deleteSchoolInput = (count) => {
    let target = document.querySelector(`.school-${count}`);    
    target.parentNode.removeChild(target);
  }

  switch(type){
    case "high":
      return (
        <div className={`school-${count}`}>
          고등학교
          <Input name={`school-${count}`} size="large" placeholder="학교명" onChange={handleSchoolChange} />
          {/* <input type="text" name={`school-${count}`} placeholder="학교명" onChange={handleSchoolChange}/>  */}
          <Button onClick={() => {deleteSchoolInput(count)}}> 삭제 </Button>
        </div>
      );
    case "univ":
      return (
        <div className={`school-${count}`}>
          대학교 (학사)
          <Input name={`school-${count}`} size="large" placeholder="학교명" onChange={handleSchoolChange} />
          {/* <input type="text" name={`school-${count}`} placeholder="학교명" onChange={handleSchoolChange}/>  */}
          <Button onClick={() => {deleteSchoolInput(count)}}> 삭제 </Button>
        </div>
      );
    case "grad":
      return (
        <div className={`school-${count}`}>
          대학원 (석사)
          <Input name={`school-${count}`} size="large" placeholder="학교명" onChange={handleSchoolChange} />
          <Button onClick={() => {deleteSchoolInput(count)}}> 삭제 </Button>
        </div>
      );
      case "doc":
        return (
          <div className={`school-${count}`}>
            대학원 (박사)
            <Input name={`school-${count}`} size="large" placeholder="학교명" onChange={handleSchoolChange} />
            <Button onClick={() => {deleteSchoolInput(count)}}> 삭제 </Button>
          </div>
        );
    default:
      console.log(type, count)
      return <div> error </div>
  }
}

export default SchoolInput;
