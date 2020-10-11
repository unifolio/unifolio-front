import React, {useState} from 'react';

const SchoolInput = (props) => {
  const { type, count } = props;
  
  const deleteSchoolInput = (count) => {
    let target = document.querySelector(`.school-${count}`);    
    target.parentNode.removeChild(target);
  }

  switch(type){
    case "high":
      return (
        <div className={`school-${count}`}>
          고등학교
          <input type="text" name={`school-${count}`} placeholder="학교명"/> <button onClick={() => {deleteSchoolInput(count)}}>삭제</button>
        </div>
      );
    case "univ":
      return (
        <div className={`school-${count}`}>
          대학교 (학사)
          <input type="text" name={`school-${count}`} placeholder="학교명"/> <button onClick={() => {deleteSchoolInput(count)}}>삭제</button>
        </div>
      );
    case "grad":
      return (
        <div className={`school-${count}`}>
          대학원 (석사)
          <input type="text" name={`school-${count}`} placeholder="학교명"/> <button onClick={() => {deleteSchoolInput(count)}}>삭제</button>
        </div>
      );
      case "doc":
        return (
          <div className={`school-${count}`}>
            대학원 (박사)
            <input type="text" name={`school-${count}`} placeholder="학교명"/> <button onClick={() => {deleteSchoolInput(count)}}>삭제</button>
          </div>
        );
    default:
      return <div> error </div>
  }
}

export default SchoolInput;
